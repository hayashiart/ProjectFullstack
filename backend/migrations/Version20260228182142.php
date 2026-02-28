<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260228182142 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE habit (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description CLOB DEFAULT NULL, created_at DATETIME DEFAULT NULL, user_id INTEGER NOT NULL, CONSTRAINT FK_44FE2172A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_44FE2172A76ED395 ON habit (user_id)');
        $this->addSql('CREATE TABLE habit_completion (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date DATE NOT NULL, completed BOOLEAN NOT NULL, habit_id INTEGER NOT NULL, CONSTRAINT FK_AEAF90C5E7AEB3B2 FOREIGN KEY (habit_id) REFERENCES habit (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_AEAF90C5E7AEB3B2 ON habit_completion (habit_id)');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles CLOB NOT NULL, password VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON user (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE habit');
        $this->addSql('DROP TABLE habit_completion');
        $this->addSql('DROP TABLE user');
    }
}
