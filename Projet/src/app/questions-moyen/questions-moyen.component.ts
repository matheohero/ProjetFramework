import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PcProfile } from '../questions/questions.component';

export interface QuestionMoyen {
  id: string;
  text: string;
  subtitle?: string;
  type: 'yesno' | 'choice';
  options?: { label: string; sublabel?: string; value: string }[];
  yesNext?: string;
  noNext?: string;
  choiceNext?: { [key: string]: string };
  isRecommendation?: boolean;
  recommendationText?: string;
}

export interface HistoryEntryMoyen {
  questionText: string;
  answer: string;
}

@Component({
  selector: 'app-questions-moyen',
  standalone: false,
  templateUrl: './questions-moyen.component.html',
  styleUrls: ['./questions-moyen.component.css'],
})
export class QuestionsMoyenComponent implements OnInit {

  pcProfile: PcProfile = {
    ram: -1,
    rom: -1,
    budget: -1,
    type: '',
  };

  constructor(private router: Router) {}

  questions: { [id: string]: QuestionMoyen } = {

    // ── TYPE ────────────────────────────────────────────
    q_type: {
      id: 'q_type',
      text: 'Quel type d\'ordinateur vous voulez ?',
      subtitle: 'Format physique de la machine',
      type: 'choice',
      options: [
        { label: 'Tour', sublabel: 'Upgradable, meilleur rapport perf/prix', value: 'fixe' },
        { label: 'Portable', sublabel: 'Autonomie + mobilité, dalle IPS/OLED', value: 'portable' },
      ],
      choiceNext: {
        fixe: 'q_cpu',
        portable: 'q_cpu',
        mini: 'q_cpu',
      },
    },

    // ── CPU ─────────────────────────────────────────────
    q_cpu: {
      id: 'q_cpu',
      text: 'Choix de la marque du processeur',
      subtitle: 'architecture CPU ?',
      type: 'choice',
      options: [
        { label: 'Intel', sublabel: 'IPC élevé, compatibilité large, DDR5', value: 'INTEL' },
        { label: 'AMD', sublabel: 'Multi-thread supérieur, AM5, PCIe 5.0', value: 'AMD' },
      ],
      choiceNext: {
        INTEL: 'q_gpu',
        AMD: 'q_gpu',
      },
    },

    // ── GPU 
    q_gpu: {
      id: 'q_gpu',
      text: 'Choix de la marque de la carte graphique',
      subtitle: 'architecture GPU',
      type: 'choice',
      options: [
        { label: 'NVIDIA', sublabel: 'DLSS 3, ray-tracing, CUDA pour IA/rendu', value: 'NVADIA' },
        { label: 'Intel', sublabel: 'XeSS, encodage AV1, bon rapport qualité/prix', value: 'INTEL' },
      ],
      choiceNext: {
        NVADIA: 'q_gpu_vram',
        INTEL: 'q_gpu_vram',
      },
    },

    // ── GPU VRAM 
    q_gpu_vram: {
      id: 'q_gpu_vram',
      text: 'RAM minimale nécessaire ?',
      subtitle: 'Mémoire vidéo dédiée',
      type: 'choice',
      options: [
        { label: '8 Go ', sublabel: '1080p / 1440p, jeux AAA standard', value: 'vram_8' },
        { label: '16 Go', sublabel: '4K, rendu 3D, inférence ML légère', value: 'vram_16' },
        { label: '32 Go+', sublabel: 'Workstation, LLM local, production vidéo', value: 'vram_32' },
      ],
      choiceNext: {
        vram_8: 'q_ram',
        vram_16: 'q_ram',
        vram_32: 'q_ram',
      },
    },

    // questions inutiles 
    q_ram: {
      id: 'q_ram',
      text: 'Configuration RAM ?',
      subtitle: 'Capacité et mode dual-channel',
      type: 'choice',
      options: [
        { label: '16 Go DDR5 (2×8)', sublabel: 'Dual-channel, usage gaming / bureau', value: 'ram_16' },
        { label: '32 Go DDR5 (2×16)', sublabel: 'Dual-channel, VM, compilation, créa', value: 'ram_32' },
        { label: '64 Go DDR5 (2×32)', sublabel: 'Workstation, montage 4K, ML', value: 'ram_64' },
      ],
      choiceNext: {
        ram_16: 'q_storage_type',
        ram_32: 'q_storage_type',
        ram_64: 'q_storage_type',
      },
    },

    // ── STOCKAGE TYPE 
    q_storage_type: {
      id: 'q_storage_type',
      text: 'Interface de stockage primaire ?',
      subtitle: 'Protocole et bande passante',
      type: 'choice',
      options: [
        { label: 'SSD', sublabel: 'rapide mais cher', value: 'SSD' },
        { label: 'HDD', sublabel: 'lent mais économique', value: 'HDD' },
      ],
      choiceNext: {
        SSD: 'q_storage_size',
        HDD: 'q_storage_size',
      },
    },

    // ── STOCKAGE CAPACIT
    q_storage_size: {
      id: 'q_storage_size',
      text: 'Capacité de stockage ?',
      subtitle: 'Volume total du disque principal',
      type: 'choice',
      options: [
        { label: '512 Go', sublabel: 'OS + apps, stockage externe recommandé', value: 'ssd_512' },
        { label: '1 To', sublabel: 'Polyvalent, jeux + projets courants', value: 'ssd_1000' },
        { label: '2 To+', sublabel: 'Bibliothèque de jeux, assets, samples audio', value: 'ssd_2000' },
      ],
      choiceNext: {
        ssd_512: 'q_budget',
        ssd_1000: 'q_budget',
        ssd_2000: 'q_budget',
      },
    },

    // ── BUDGET
    q_budget: {
      id: 'q_budget',
      text: 'Prix maximal ?',
      subtitle: 'Enveloppe budgétaire',
      type: 'choice',
      options: [
        { label: '500 €', sublabel: 'Entrée de gamme performante', value: 'low' },
        { label: '1000 €', sublabel: 'Milieu de gamme polyvalent', value: 'mid' },
        { label: '1500 €', sublabel: 'Haut de gamme gaming / créa', value: 'high' },
        { label: '2000 €', sublabel: 'Workstation / no-compromise', value: 'premium' },
      ],
      choiceNext: {
        low: 'rec_final',
        mid: 'rec_final',
        high: 'rec_final',
        premium: 'rec_final',
      },
    },

    // ── FINAL 
    rec_final: {
      id: 'rec_final',
      text: 'Profil configuré',
      type: 'choice',
      isRecommendation: true,
      recommendationText: 'Votre profil technique est prêt. Lancement de la recherche avec vos critères.',
    },
  };

  currentQuestionId = 'q_type';
  history: HistoryEntryMoyen[] = [];
  finished = false;

  // Stockage temporaire des choix techniques
  private selectedCpu = '';
  private selectedGpu = '';

  get currentQuestion(): QuestionMoyen {
    return this.questions[this.currentQuestionId];
  }

  get progressPercent(): number {
    const totalSteps = Object.values(this.questions).filter(q => !q.isRecommendation).length;
    if (this.finished) return 100;
    return Math.min(Math.round((this.history.length / totalSteps) * 100), 100);
  }

  ngOnInit(): void {}

  answerYesNo(answer: 'yes' | 'no'): void {
    const q = this.currentQuestion;
    const label = answer === 'yes' ? 'Oui' : 'Non';
    this.history.push({ questionText: q.text, answer: label });

    const next = answer === 'yes' ? q.yesNext : q.noNext;
    if (next) {
      this.currentQuestionId = next;
    } else {
      this.finished = true;
    }
  }

  answerChoice(value: string, label: string): void {
    const q = this.currentQuestion;
    this.history.push({ questionText: q.text, answer: label });

    // Sauvegarde des valeurs du profil
    if (q.id === 'q_type') {
      this.pcProfile.type = value; // 'fixe', 'portable', 'mini'
    }

    if (q.id === 'q_cpu') {
      this.selectedCpu = value; // 'INTEL' ou 'AMD'
    }

    if (q.id === 'q_gpu') {
      this.selectedGpu = value; // 'NVADIA' ou 'INTEL'
    }

    if (q.id === 'q_ram') {
      const ramMap: Record<string, number> = {
        ram_8: 8,
        ram_16: 16,
        ram_32: 32,
      };
      this.pcProfile.ram = ramMap[value];
    }

    if (q.id === 'q_storage_size') {
      const romMap: Record<string, number> = {
        ssd_512: 512,
        ssd_1000: 1050,
        ssd_2000: 2050,
      };
      this.pcProfile.rom = romMap[value];
    }

    if (q.id === 'q_budget') {
      const budgetMap: Record<string, number> = {
        low: 500,
        mid: 1000,
        high: 1500,
        premium: 2000,
      };
      this.pcProfile.budget = budgetMap[value];
    }

    const next = q.choiceNext?.[value];
    if (next) {
      this.currentQuestionId = next;
      if (this.questions[next]?.isRecommendation) {
        this.saveProfile();
      }
    } else {
      this.saveProfile();
      this.finished = true;
    }
  }

  private saveProfile(): void {
    localStorage.removeItem('pcProfileApplied');
    localStorage.setItem('pcProfile', JSON.stringify(this.pcProfile));
    localStorage.setItem('cpu', this.selectedCpu);
    localStorage.setItem('gpu', this.selectedGpu);
  }

  proceedFromRecommendation(): void {
    this.finished = true;
  }

  lancerRecherche(): void {
    localStorage.setItem('pcProfileApplied', 'true');
    localStorage.setItem('typePC',  this.pcProfile.type);
    localStorage.setItem('ramMin',  this.pcProfile.ram.toString());
    localStorage.setItem('romMin',  this.pcProfile.rom.toString());
    localStorage.setItem('prixMax', this.pcProfile.budget.toString());

    this.router.navigate(['/recherche'], {
      queryParams: {
        typePC:  this.pcProfile.type,
        cpu:     this.selectedCpu,
        gpu:     this.selectedGpu,
        ramMin:  this.pcProfile.ram,
        romMin:  this.pcProfile.rom,
        prixMax: this.pcProfile.budget,
      }
    });
  }

  getVisibleSteps(): QuestionMoyen[] {
    return Object.values(this.questions).filter(q => !q.isRecommendation);
  }

  getAnswerIcon(answer: string): string {
    return answer === 'Oui' ? '✓' : answer === 'Non' ? '✗' : '→';
  }

  restart(): void {
    this.currentQuestionId = 'q_type';
    this.history = [];
    this.finished = false;
    this.selectedCpu = '';
    this.selectedGpu = '';
    this.pcProfile = { ram: -1, rom: -1, budget: -1, type: '' };
  }
}