<?php

namespace App\Controller;

use App\Entity\Habit;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api')]
class HabitController extends AbstractController
{
    #[Route('/my-habits', name: 'api_my_habits', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function myHabits(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        $habits = $em->getRepository(Habit::class)->findBy(
            ['user' => $user],
            ['createdAt' => 'DESC']
        );

        $data = [];
        foreach ($habits as $habit) {
            $data[] = [
                'id' => $habit->getId(),
                'name' => $habit->getName(),
                'description' => $habit->getDescription(),
                'createdAt' => $habit->getCreatedAt()?->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data);
    }

   #[Route('/manual-habits', name: 'api_manual_habit_create', methods: ['POST'])]
#[IsGranted('ROLE_USER')]
public function create(Request $request, EntityManagerInterface $em): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return $this->json(['error' => 'JSON invalide'], 400);
    }

    $name = trim($data['name'] ?? '');
    $description = trim($data['description'] ?? '');

    if (empty($name)) {
        return $this->json(['error' => 'Le nom de l’habitude est obligatoire'], 400);
    }

    $habit = new Habit();
    $habit->setName($name);
    $habit->setDescription($description ?: null);
    $habit->setUser($this->getUser());
    $habit->setCreatedAt(new \DateTimeImmutable());

    $em->persist($habit);
    $em->flush();

    return $this->json([
        'id' => $habit->getId(),
        'name' => $habit->getName(),
        'description' => $habit->getDescription(),
        'createdAt' => $habit->getCreatedAt()->format('Y-m-d H:i:s'),
        'message' => 'Habitude créée avec succès'
    ], 201);
}

#[Route('/habits/{id}', name: 'api_habit_update', methods: ['PUT'])]
#[IsGranted('ROLE_USER')]
public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
{
    $habit = $em->getRepository(Habit::class)->find($id);
    if (!$habit || $habit->getUser() !== $this->getUser()) {
        return $this->json(['error' => 'Habitude non trouvée ou non autorisée'], 404);
    }

    $data = json_decode($request->getContent(), true);
    $habit->setName(trim($data['name'] ?? $habit->getName()));
    $habit->setDescription(trim($data['description'] ?? $habit->getDescription()));

    $em->flush();

    return $this->json(['message' => 'Habitude modifiée']);
}

#[Route('/habits/{id}', name: 'api_habit_delete', methods: ['DELETE'])]
#[IsGranted('ROLE_USER')]
public function delete(int $id, EntityManagerInterface $em): JsonResponse
{
    $habit = $em->getRepository(Habit::class)->find($id);
    if (!$habit || $habit->getUser() !== $this->getUser()) {
        return $this->json(['error' => 'Habitude non trouvée ou non autorisée'], 404);
    }

    $em->remove($habit);
    $em->flush();

    return $this->json(['message' => 'Habitude supprimée']);
}

#[Route('/habits/{id}/complete', name: 'api_habit_complete', methods: ['POST'])]
#[IsGranted('ROLE_USER')]
public function complete(int $id, EntityManagerInterface $em): JsonResponse
{
    $habit = $em->getRepository(Habit::class)->find($id);
    if (!$habit || $habit->getUser() !== $this->getUser()) {
        return $this->json(['error' => 'Non autorisé'], 403);
    }

    $completion = new HabitCompletion();
    $completion->setHabit($habit);
    $completion->setDate(new \DateTime());
    $completion->setCompleted(true);

    $em->persist($completion);
    $em->flush();

    return $this->json(['message' => 'Journée marquée comme complétée']);
}

}
