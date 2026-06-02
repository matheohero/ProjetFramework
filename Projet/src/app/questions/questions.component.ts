import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Question {
  id: string;
  text: string;
  type: 'yesno' | 'choice' | 'budget';
  options?: { label: string; value: string }[];
  yesNext?: string;
  noNext?: string;
  choiceNext?: { [key: string]: string };
  isRecommendation?: boolean;
  recommendationText?: string;
}

export interface HistoryEntry {
  questionText: string;
  answer: string;
}

@Component({
  selector: 'app-questions',
  standalone: false,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

export class QuestionsComponent implements OnInit {
  questions: { [id: string]: Question } = {
    q_gaming: {
      id: 'q_gaming',
      text: 'Voulez-vous un ordinateur pour jouer principalement à des jeux ?',
      type: 'yesno',
      yesNext: 'q_recent_games',
      noNext: 'q_3d',
    },
    q_recent_games: {
      id: 'q_recent_games',
      text: 'Parmi ces jeux, y a-t-il des jeux récents qui demandent beaucoup de ressources ?',
      type: 'yesno',
      yesNext: 'rec_gpu_high',
      noNext: 'rec_gpu_mid',
    },
    rec_gpu_mid: {
      id: 'rec_gpu_mid',
      text: 'Besoin d\'une carte graphique de moyenne gamme',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Une carte graphique de moyenne gamme sera donc suffisante.',
      yesNext: 'q_multitask',
      noNext: 'q_multitask',
    },
    rec_gpu_high: {
      id: 'rec_gpu_high',
      text: 'Besoin d\'une carte graphique performante',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Pour les applications gourmandes en ressources, une carte graphique haut de gamme s\'impose.',
      yesNext: 'q_multitask',
      noNext: 'q_multitask',
    },
    q_3d: {
      id: 'q_3d',
      text: 'Voulez-vous faire de la modélisation 3D / graphique ?',
      type: 'yesno',
      yesNext: 'rec_gpu_high',
      noNext: 'q_multitask',
    },
    q_multitask: {
      id: 'q_multitask',
      text: 'Voulez-vous pouvoir utiliser beaucoup de logiciels en même temps ?',
      type: 'yesno',
      yesNext: 'rec_ram',
      noNext: 'q_browser_tabs',
    },
    rec_ram: {
      id: 'rec_ram',
      text: 'La RAM ne sera donc pas une priorité absolue pour vous',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Nous allons augmenter la priorité sur la RAM (16 Go minimum recommandé, 32 Go idéal).',
      yesNext: 'q_travel',
      noNext: 'q_travel',
    },
    q_browser_tabs: {
      id: 'q_browser_tabs',
      text: 'Voulez-vous pouvoir utiliser beaucoup d\'onglets de navigateur web en même temps ?',
      type: 'yesno',
      yesNext: 'rec_ram',
      noNext: 'q_travel',
    },
    q_travel: {
      id: 'q_travel',
      text: 'Allez-vous vous déplacer avec l\'ordinateur ?',
      type: 'yesno',
      yesNext: 'rec_laptop',
      noNext: 'rec_desktop',
    },
    rec_desktop: {
      id: 'rec_desktop',
      text: 'Proposer un ordinateur fixe',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Un ordinateur fixe (tour) est recommandé : plus de puissance pour le prix et plus facile à upgrader.',
      yesNext: 'q_wifi_desktop',
      noNext: 'q_wifi_desktop',
    },
    q_wifi_desktop: {
      id: 'q_wifi_desktop',
      text: 'Voulez-vous avoir accès au WiFi sur votre ordinateur fixe ?',
      type: 'yesno',
      yesNext: 'rec_desktop_wifi',
      noNext: 'q_color',
    },
    rec_desktop_wifi: {
      id: 'rec_desktop_wifi',
      text: 'Filtrer les ordinateurs fixes avec une carte WiFi',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Nous filtrons les ordinateurs fixes équipés d\'une carte WiFi intégrée.',
      yesNext: 'q_color',
      noNext: 'q_color',
    },
    rec_laptop: {
      id: 'rec_laptop',
      text: 'Proposer un ordinateur portable',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Un ordinateur portable est recommandé pour vous accompagner partout.',
      yesNext: 'q_color',
      noNext: 'q_color',
    },
    q_color: {
      id: 'q_color',
      text: 'De quelle couleur voulez-vous votre ordinateur ?',
      type: 'choice',
      options: [
        { label: 'Noir', value: 'black' },
        { label: 'Blanc / Argent', value: 'white' },
        { label: 'Gris', value: 'gray' },
        { label: 'Autre / Peu importe', value: 'any' },
      ],
      choiceNext: {
        black: 'q_budget',
        white: 'q_budget',
        gray: 'q_budget',
        any: 'q_budget',
      },
    },
    q_budget: {
      id: 'q_budget',
      text: 'Quelle est votre budget ?',
      type: 'budget',
      options: [
        { label: 'Moins de 500 €', value: 'low' },
        { label: '500 € – 900 €', value: 'mid' },
        { label: '900 € – 1 500 €', value: 'high' },
        { label: 'Plus de 1 500 €', value: 'premium' },
      ],
      choiceNext: {
        low: 'q_size',
        mid: 'q_size',
        high: 'q_size',
        premium: 'q_size',
      },
    },
    q_size: {
      id: 'q_size',
      text: 'Quelle taille d\'ordinateur voulez-vous ?',
      type: 'choice',
      options: [
        { label: '13" – 14" (compact)', value: 'small' },
        { label: '15" – 16" (standard)', value: 'medium' },
        { label: '17"+ (grand écran)', value: 'large' },
        { label: 'Peu importe', value: 'any' },
      ],
      choiceNext: {
        small: 'q_storage',
        medium: 'q_storage',
        large: 'q_storage',
        any: 'q_storage',
      },
    },
    q_storage: {
      id: 'q_storage',
      text: 'Allez-vous stocker beaucoup de fichiers (images, vidéos, applications…) ?',
      type: 'yesno',
      yesNext: 'rec_storage_big',
      noNext: 'rec_storage_std',
    },
    rec_storage_big: {
      id: 'rec_storage_big',
      text: 'Filtrer les ordinateurs avec 2 To ou plus de stockage',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Nous filtrons les configurations avec 2 To ou plus de stockage. Disque de ~300 Go minimum, et si le reste du budget le permet, vous pourrez choisir plus de stockage.',
      yesNext: 'rec_final',
      noNext: 'rec_final',
    },
    rec_storage_std: {
      id: 'rec_storage_std',
      text: 'Disque de ~300 Go',
      type: 'yesno',
      isRecommendation: true,
      recommendationText:
        'Un SSD de 256 à 512 Go sera largement suffisant pour votre usage.',
      yesNext: 'rec_final',
      noNext: 'rec_final',
    },
    rec_final: {
      id: 'rec_final',
      text: 'Récapitulatif de vos besoins',
      type: 'yesno',
      isRecommendation: true,
      recommendationText: '__SUMMARY__',
    },
  };

  currentQuestionId = 'q_gaming';
  history: HistoryEntry[] = [];
  recommendations: string[] = [];
  finished = false;

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionId];
  }

  get progressPercent(): number {
    const totalSteps = 14;
    return Math.min(Math.round((this.history.length / totalSteps) * 100), 95);
  }

  ngOnInit(): void {}

  answerYesNo(answer: 'yes' | 'no'): void {
    const q = this.currentQuestion;
    const label = answer === 'yes' ? 'Oui' : 'Non';
    this.history.push({ questionText: q.text, answer: label });

    if (q.isRecommendation) {
      if (q.recommendationText !== '__SUMMARY__') {
        this.recommendations.push(q.recommendationText!);
      }
      const next = q.yesNext;
      if (next) {
        this.currentQuestionId = next;
      } else {
        this.finished = true;
      }
      return;
    }

    const next = answer === 'yes' ? q.yesNext : q.noNext;
    if (next) {
      this.currentQuestionId = next;
      if (this.questions[next]?.isRecommendation) {
        this.showRecommendation();
      }
    } else {
      this.finished = true;
    }
  }

  answerChoice(value: string, label: string): void {
    const q = this.currentQuestion;
    this.history.push({ questionText: q.text, answer: label });
    const next = q.choiceNext?.[value];
    if (next) {
      this.currentQuestionId = next;
      if (this.questions[next]?.isRecommendation) {
        this.showRecommendation();
      }
    } else {
      this.finished = true;
    }
  }

  showRecommendation(): void {
    const q = this.currentQuestion;
    if (q.isRecommendation && q.recommendationText !== '__SUMMARY__') {
      this.recommendations.push(q.recommendationText!);
    }
  }

  proceedFromRecommendation(): void {
    const q = this.currentQuestion;
    if (q.id === 'rec_final') {
      this.finished = true;
      return;
    }
    const next = q.yesNext;
    if (next) {
      this.currentQuestionId = next;
      if (this.questions[next]?.isRecommendation) {
        this.showRecommendation();
      }
    } else {
      this.finished = true;
    }
  }

  getSummaryLines(): string[] {
    return this.recommendations;
  }

  restart(): void {
    this.currentQuestionId = 'q_gaming';
    this.history = [];
    this.recommendations = [];
    this.finished = false;
  }

  getAnswerIcon(answer: string): string {
    return answer === 'Oui' ? '✓' : answer === 'Non' ? '✗' : '→';
  }
}