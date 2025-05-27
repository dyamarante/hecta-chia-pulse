
import { Certification } from '../contexts/CertificationContext';

interface TimelineEvent {
  year: string;
  event: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface CertificationTranslations {
  trust_across_borders: string;
  certifications_description: string;
  download_certificates: string;
  certification_matrix: string;
  key_benefits: string;
  validity: string;
  auditor: string;
  view_certificate: string;
  digital_verification: string;
  digital_verification_description: string;
  certificate_pdf: string;
  lab_results: string;
  blockchain_timestamp: string;
  qr_demo: string;
  batch: string;
  harvest: string;
  blockchain_hash: string;
  verified: string;
  authentic: string;
  compliance_timeline: string;
  faq: string;
  certifications: Certification[];
  timeline: TimelineEvent[];
  faqItems: FaqItem[];
}

const translations: Record<string, CertificationTranslations> = {
  pt: {
    trust_across_borders: "Confiança que atravessa fronteiras",
    certifications_description: "Cada lote de chia que você recebe tem lastro em certificações reconhecidas mundialmente e auditadas por terceiros. Qualidade, segurança alimentar e responsabilidade social em um só lugar.",
    download_certificates: "Baixar Certificados PDF",
    certification_matrix: "Matriz de Certificações",
    key_benefits: "Benefícios-chave:",
    validity: "Validade:",
    auditor: "Auditor:",
    view_certificate: "Ver certificado",
    digital_verification: "Verificação Digital & Blockchain",
    digital_verification_description: "Cada lote de chia contém um QR code exclusivo que dá acesso à página de verificação no Hecta-pay-hub. Escaneie o código para acessar:",
    certificate_pdf: "PDF do certificado relevante para o lote",
    lab_results: "Resultados de análises laboratoriais (micotoxinas, glúten, pesticidas)",
    blockchain_timestamp: "Carimbo de data/hora (UTC) da transação em blockchain",
    qr_demo: "Demonstração do QR Code",
    batch: "Lote",
    harvest: "Safra",
    blockchain_hash: "Blockchain Hash",
    verified: "Verificado",
    authentic: "Autêntico",
    compliance_timeline: "Linha do tempo da Conformidade",
    faq: "Perguntas Frequentes",
    certifications: [
      {
        id: 'usda',
        name: 'USDA Organic',
        scope: 'Regulamento NOP (7 CFR Part 205) — EUA',
        benefits: ['Sem pesticidas sintéticos', 'Necessário para uso do selo "Orgânico" em rótulos dos EUA'],
        validity: 'Auditor externo anual. Certificado válido até Dez/2025.',
        auditor: 'AMS',
        image: 'https://www.usda.gov/sites/default/files/usda-logo.png'
      },
      {
        id: 'eu',
        name: 'União Europeia Orgânico',
        scope: 'Regulamento (UE) 2018/848 — União Europeia',
        benefits: ['Entrada preferencial na UE', 'Elegibilidade para alegações de "Produto orgânico"'],
        validity: 'Certificador ECOCERT - válido até Jun/2025',
        auditor: 'ECOCERT',
        image: '/lovable-uploads/9e1fcabb-d8c0-4c8e-82cc-9dd2cf53cce0.png'
      }
    ],
    timeline: [
      { year: '2018', event: 'USDA Orgânico' },
      { year: '2019', event: 'União Europeia Orgânico + COR' },
      { year: '2020', event: 'BRCGS A → 2023 upgrade para AA+' },
      { year: '2021', event: 'Kosher OU' },
      { year: '2022', event: 'Halal GCC + SMETA 4P' },
      { year: '2023', event: 'Non-GMO Project Verified' }
    ],
    faqItems: [
      {
        question: "Por que alguns certificados não mostram a data de inspeção deste ano?",
        answer: "Publicamos apenas versões que não expõem dados sensíveis; a validade legal está no blockchain."
      },
      {
        question: "Posso usar o selo USDA na embalagem da minha marca?",
        answer: "Sim, desde que não modifique o status orgânico do produto em sua planta e cite nosso certificado NOP."
      }
    ]
  },
  en: {
    trust_across_borders: "Trust across borders",
    certifications_description: "Each batch of chia you receive is backed by globally recognized certifications audited by third parties. Quality, food safety, and social responsibility in one place.",
    download_certificates: "Download PDF Certificates",
    certification_matrix: "Certification Matrix",
    key_benefits: "Key Benefits:",
    validity: "Validity:",
    auditor: "Auditor:",
    view_certificate: "View Certificate",
    digital_verification: "Digital Verification & Blockchain",
    digital_verification_description: "Each batch of chia contains a unique QR code that gives access to the verification page on Hecta-pay-hub. Scan the code to access:",
    certificate_pdf: "PDF of the certificate relevant to the batch",
    lab_results: "Laboratory analysis results (mycotoxins, gluten, pesticides)",
    blockchain_timestamp: "Blockchain transaction timestamp (UTC)",
    qr_demo: "QR Code Demo",
    batch: "Batch",
    harvest: "Harvest",
    blockchain_hash: "Blockchain Hash",
    verified: "Verified",
    authentic: "Authentic",
    compliance_timeline: "Compliance Timeline",
    faq: "Frequently Asked Questions",
    certifications: [
      {
        id: 'usda',
        name: 'USDA Organic',
        scope: 'NOP Regulation (7 CFR Part 205) — USA',
        benefits: ['No synthetic pesticides', 'Required for use of "Organic" seal on US labels'],
        validity: 'Annual external auditor. Certificate valid until Dec/2025.',
        auditor: 'AMS',
        image: 'https://www.usda.gov/sites/default/files/usda-logo.png'
      },
      {
        id: 'eu',
        name: 'EU Organic',
        scope: 'Regulation (EU) 2018/848 — European Union',
        benefits: ['Preferential entry into the EU', 'Eligibility for "Organic product" claims'],
        validity: 'ECOCERT certifier — valid until Jun/2025',
        auditor: 'ECOCERT',
        image: '/lovable-uploads/9e1fcabb-d8c0-4c8e-82cc-9dd2cf53cce0.png'
      }
    ],
    timeline: [
      { year: '2018', event: 'USDA Organic' },
      { year: '2019', event: 'EU Organic + COR' },
      { year: '2020', event: 'BRCGS A → 2023 upgrade to AA+' },
      { year: '2021', event: 'Kosher OU' },
      { year: '2022', event: 'Halal GCC + SMETA 4P' },
      { year: '2023', event: 'Non-GMO Project Verified' }
    ],
    faqItems: [
      {
        question: "Why don't some certificates show this year's inspection date?",
        answer: "We publish only versions that do not expose sensitive data; legal validity is on the blockchain."
      },
      {
        question: "Can I use the USDA seal on my brand's packaging?",
        answer: "Yes, as long as you do not modify the organic status of the product in your facility and cite our NOP certificate."
      }
    ]
  },
  zh: {
    trust_across_borders: "跨境信任",
    certifications_description: "您收到的每批奇亚籽都由全球认可的第三方审核认证支持。质量、食品安全和社会责任集于一处。",
    download_certificates: "下载PDF证书",
    certification_matrix: "认证矩阵",
    key_benefits: "主要优势：",
    validity: "有效期：",
    auditor: "审核方：",
    view_certificate: "查看证书",
    digital_verification: "数字验证和区块链",
    digital_verification_description: "每批奇亚籽都包含一个独特的二维码，可访问Hecta-pay-hub上的验证页面。扫描二维码可查看：",
    certificate_pdf: "与批次相关的证书PDF",
    lab_results: "实验室分析结果（霉菌毒素、麸质、农药）",
    blockchain_timestamp: "区块链交易时间戳（UTC）",
    qr_demo: "二维码演示",
    batch: "批次",
    harvest: "收获",
    blockchain_hash: "区块链哈希",
    verified: "已验证",
    authentic: "真实",
    compliance_timeline: "合规时间线",
    faq: "常见问题",
    certifications: [
      {
        id: 'usda',
        name: 'USDA有机',
        scope: 'NOP法规 (7 CFR Part 205) — 美国',
        benefits: ['无合成农药', '美国产品标签使用"有机"字样的必要条件'],
        validity: '年度外部审核员。证书有效期至2025年12月。',
        auditor: 'AMS',
        image: 'https://www.usda.gov/sites/default/files/usda-logo.png'
      },
      {
        id: 'eu',
        name: '欧盟有机',
        scope: '欧盟法规 (EU) 2018/848 — 欧盟',
        benefits: ['欧盟优先入境', '符合"有机产品"声明资格'],
        validity: 'ECOCERT认证机构 — 有效期至2025年6月',
        auditor: 'ECOCERT',
        image: '/lovable-uploads/9e1fcabb-d8c0-4c8e-82cc-9dd2cf53cce0.png'
      }
    ],
    timeline: [
      { year: '2018年', event: 'USDA有机认证' },
      { year: '2019年', event: '欧盟有机认证 + COR' },
      { year: '2020年', event: 'BRCGS A → 2023年升级至AA+' },
      { year: '2021年', event: '犹太洁食OU' },
      { year: '2022年', event: '清真GCC + SMETA 4P' },
      { year: '2023年', event: '非转基因项目验证' }
    ],
    faqItems: [
      {
        question: "为什么某些证书没有显示今年的检查日期？",
        answer: "我们仅发布不暴露敏感数据的版本；法律有效性在区块链上。"
      },
      {
        question: "我可以在我的品牌包装上使用USDA标志吗？",
        answer: "是的，只要您不在工厂中更改产品的有机状态，并引用我们的NOP证书。"
      }
    ]
  },
  ar: {
    trust_across_borders: "ثقة عبر الحدود",
    certifications_description: "كل دفعة من بذور الشيا التي تستلمها مدعومة بشهادات معترف بها عالميًا ومدققة من طرف ثالث. الجودة وسلامة الأغذية والمسؤولية الاجتماعية في مكان واحد.",
    download_certificates: "تنزيل شهادات PDF",
    certification_matrix: "مصفوفة الشهادات",
    key_benefits: "المزايا الرئيسية:",
    validity: "الصلاحية:",
    auditor: "المدقق:",
    view_certificate: "عرض الشهادة",
    digital_verification: "التحقق الرقمي وبلوكشين",
    digital_verification_description: "تحتوي كل دفعة من بذور الشيا على رمز QR فريد يتيح الوصول إلى صفحة التحقق على منصة Hecta-pay-hub. امسح الرمز للوصول إلى:",
    certificate_pdf: "ملف PDF للشهادة المتعلقة بالدفعة",
    lab_results: "نتائج التحليل المخبري (السموم الفطرية، الجلوتين، المبيدات)",
    blockchain_timestamp: "الختم الزمني لمعاملة البلوكشين (UTC)",
    qr_demo: "عرض رمز QR",
    batch: "الدفعة",
    harvest: "الحصاد",
    blockchain_hash: "تجزئة البلوكشين",
    verified: "تم التحقق",
    authentic: "أصلي",
    compliance_timeline: "جدول زمني للامتثال",
    faq: "الأسئلة المتكررة",
    certifications: [
      {
        id: 'usda',
        name: 'USDA العضوي',
        scope: 'لائحة NOP (7 CFR Part 205) — الولايات المتحدة الأمريكية',
        benefits: ['بدون مبيدات اصطناعية', 'مطلوب لاستخدام ملصق "عضوي" على المنتجات الأمريكية'],
        validity: 'مدقق خارجي سنوي. الشهادة صالحة حتى ديسمبر/2025.',
        auditor: 'AMS',
        image: 'https://www.usda.gov/sites/default/files/usda-logo.png'
      },
      {
        id: 'eu',
        name: 'المنتج العضوي الأوروبي',
        scope: 'لائحة (UE) 2018/848 — الاتحاد الأوروبي',
        benefits: ['دخول تفضيلي إلى الاتحاد الأوروبي', 'الأهلية لوضع علامات "منتج عضوي"'],
        validity: 'هيئة التصديق ECOCERT - صالحة حتى يونيو/2025',
        auditor: 'ECOCERT',
        image: '/lovable-uploads/9e1fcabb-d8c0-4c8e-82cc-9dd2cf53cce0.png'
      }
    ],
    timeline: [
      { year: '2018', event: 'USDA العضوي' },
      { year: '2019', event: 'المنتج العضوي الأوروبي + COR' },
      { year: '2020', event: 'BRCGS A → ترقية 2023 إلى AA+' },
      { year: '2021', event: 'كوشر OU' },
      { year: '2022', event: 'حلال GCC + SMETA 4P' },
      { year: '2023', event: 'التحقق من مشروع غير المعدل وراثيًا' }
    ],
    faqItems: [
      {
        question: "لماذا لا تظهر بعض الشهادات تاريخ التفتيش لهذا العام؟",
        answer: "نحن ننشر فقط الإصدارات التي لا تكشف البيانات الحساسة؛ الصلاحية القانونية موجودة على البلوكشين."
      },
      {
        question: "هل يمكنني استخدام ختم USDA على عبوة علامتي التجارية؟",
        answer: "نعم، طالما أنك لا تعدل الحالة العضوية للمنتج في منشأتك وتشير إلى شهادة NOP الخاصة بنا."
      }
    ]
  }
};

export const getCertificationTranslations = (language: string): CertificationTranslations => {
  return translations[language] || translations['en'];
};
