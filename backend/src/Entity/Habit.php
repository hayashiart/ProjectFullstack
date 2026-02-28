<?php

namespace App\Entity;

use App\Repository\HabitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HabitRepository::class)]
class Habit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'habits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    /**
     * @var Collection<int, HabitCompletion>
     */
    #[ORM\OneToMany(targetEntity: HabitCompletion::class, mappedBy: 'habit')]
    private Collection $completions;

    public function __construct()
    {
        $this->completions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, HabitCompletion>
     */
    public function getCompletions(): Collection
    {
        return $this->completions;
    }

    public function addCompletion(HabitCompletion $completion): static
    {
        if (!$this->completions->contains($completion)) {
            $this->completions->add($completion);
            $completion->setHabit($this);
        }

        return $this;
    }

    public function removeCompletion(HabitCompletion $completion): static
    {
        if ($this->completions->removeElement($completion)) {
            // set the owning side to null (unless already changed)
            if ($completion->getHabit() === $this) {
                $completion->setHabit(null);
            }
        }

        return $this;
    }
}
