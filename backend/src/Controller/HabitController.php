<?php

namespace App\Controller;

use App\Entity\Habit;
use App\Entity\HabitCompletion;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api')]
class HabitController extends AbstractController
{
    #[Route('/my-habits', name: 'api_my_habits', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function myHabits(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $habits = $em->getRepository(Habit::class)->findBy(
            ['user' => $user],
            ['createdAt' => 'DESC']
        );

        $data = array_map(function ($habit) {
            return [
                'id' => $habit->getId(),
                'name' => $habit->getName(),
                'description' => $habit->getDescription(),
                'createdAt' => $habit->getCreatedAt()?->format('Y-m-d H:i:s'),
            ];
        }, $habits);

        return $this->json($data);
    }

    #[Route('/habits', name: 'api_habit_create', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) return $this->json(['error' => 'Non authentifié'], 401);

        $data = json_decode($request->getContent(), true) ?? [];

        $name = trim($data['name'] ?? '');
        if (empty($name)) {
            return $this->json(['error' => 'Nom obligatoire'], 400);
        }

        $habit = new Habit();
        $habit->setName($name);
        $habit->setDescription(trim($data['description'] ?? '') ?: null);
        $habit->setUser($user);
        $habit->setCreatedAt(new \DateTimeImmutable());

        $em->persist($habit);
        $em->flush();

        return $this->json([
            'id' => $habit->getId(),
            'name' => $habit->getName(),
            'message' => 'Créée'
        ], 201);
    }

    #[Route('/habits/{id}', name: 'api_habit_get', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getHabit(int $id, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) return $this->json(['error' => 'Non authentifié'], 401);

        $habit = $em->getRepository(Habit::class)->find($id);
        if (!$habit || $habit->getUser()->getId() !== $user->getId()) {
            return $this->json(['error' => 'Non trouvé ou non autorisé'], 404);
        }

        return $this->json([
            'id' => $habit->getId(),
            'name' => $habit->getName(),
            'description' => $habit->getDescription(),
        ]);
    }

   #[Route('/habits/{id}', name: 'api_habit_update', methods: ['PUT'])]
#[IsGranted('ROLE_USER')]
public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
{
    $user = $this->getUser();
    if (!$user) {
        return $this->json(['error' => 'Utilisateur non authentifié'], 401);
    }

    $habit = $em->getRepository(Habit::class)->find($id);
    if (!$habit) {
        return $this->json(['error' => 'Habitude introuvable'], 404);
    }

    // CORRECTION : on utilise getUser() (getter public) et on compare les ID
    if ($habit->getUser()->getId() !== $user->getId()) {
        return $this->json(['error' => 'Vous n’êtes pas propriétaire'], 403);
    }

    $data = json_decode($request->getContent(), true) ?? [];

    $name = trim($data['name'] ?? $habit->getName());
    $description = trim($data['description'] ?? $habit->getDescription());

    if (empty($name)) {
        return $this->json(['error' => 'Le nom est obligatoire'], 400);
    }

    $habit->setName($name);
    $habit->setDescription($description ?: null);

    $em->flush();

    return $this->json([
        'message' => 'Habitude modifiée',
        'habit' => [
            'id' => $habit->getId(),
            'name' => $habit->getName(),
            'description' => $habit->getDescription(),
        ]
    ]);
}

#[Route('/habits/{id}', name: 'api_habit_delete', methods: ['DELETE'])]
#[IsGranted('ROLE_USER')]
public function delete(int $id, EntityManagerInterface $em): JsonResponse
{
    $user = $this->getUser();
    if (!$user) {
        return $this->json(['error' => 'Utilisateur non authentifié'], 401);
    }

    $habit = $em->getRepository(Habit::class)->find($id);
    if (!$habit) {
        return $this->json(['error' => 'Habitude introuvable'], 404);
    }

    // CORRECTION : comparaison par ID (getter public)
    if ($habit->getUser()->getId() !== $user->getId()) {
        return $this->json(['error' => 'Vous n’êtes pas propriétaire'], 403);
    }

    $em->remove($habit);
    $em->flush();

    return $this->json(['message' => 'Habitude supprimée'], 200);
}

#[Route('/habits/{id}/complete', name: 'api_habit_complete', methods: ['POST'])]
#[IsGranted('ROLE_USER')]
public function complete(int $id, EntityManagerInterface $em): JsonResponse
{
    $user = $this->getUser();
    if (!$user) {
        return $this->json(['error' => 'Utilisateur non authentifié'], 401);
    }

    $habit = $em->getRepository(Habit::class)->find($id);
    if (!$habit) {
        return $this->json(['error' => 'Habitude introuvable'], 404);
    }

    // CORRECTION : comparaison par ID
    if ($habit->getUser()->getId() !== $user->getId()) {
        return $this->json(['error' => 'Vous n’êtes pas propriétaire'], 403);
    }

    $today = new \DateTime('today');
    $existing = $em->getRepository(HabitCompletion::class)->findOneBy([
        'habit' => $habit,
        'date' => $today,
    ]);

    if ($existing) {
        return $this->json(['message' => 'Déjà complété aujourd’hui'], 200);
    }

    $completion = new HabitCompletion();
    $completion->setHabit($habit);
    $completion->setDate($today);
    $completion->setCompleted(true);

    $em->persist($completion);
    $em->flush();

    return $this->json(['message' => 'Journée marquée comme complétée']);
}
}