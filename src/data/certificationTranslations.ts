
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
      },
      {
        id: 'cor',
        name: 'COR Canadá',
        scope: 'Regime Orgânico Canadense — Canadá',
        benefits: ['Cumpre equivalência bilateral NOP↔COR', 'Acesso a "Saúde & Bulk" varejistas'],
        validity: 'Certificado #COR-21-247, válido até Fev/2026',
        auditor: 'COR',
        image: '/lovable-uploads/88008385-0722-45be-b132-1c9c65bbcc1d.png'
      },
      {
        id: 'jas',
        name: 'JAS Orgânico',
        scope: 'Exigência obrigatória para rotular "orgânico" no Japão',
        benefits: ['Isenção de controles fitossanitários adicionais', 'Uso do logotipo JAS na embalagem'],
        validity: 'Auditor credenciado MAFF — válido até Mar/2026',
        auditor: 'MAFF',
        image: '/lovable-uploads/3c1d4c52-aafb-489e-a14d-0e8237afb1c0.png'
      },
      {
        id: 'brcgs',
        name: 'BRCGS Segurança Alimentar AA+',
        scope: 'GFSI Global (auditorias sem aviso prévio)',
        benefits: ['Máximo nível de segurança alimentar', 'Reduz necessidade de auditorias de segunda parte'],
        validity: 'Emitido pela SGS — resultado AA+ (auditoria surpresa)',
        auditor: 'Complete Food Safety Ltd',
        image: '/lovable-uploads/9679d345-1d34-4876-b36b-691161019da6.png'
      },
      {
        id: 'fda',
        name: 'FDA FCE/Bio-T',
        scope: 'Registro de Instalação de Alimentos & Alimentos Acidificados',
        benefits: ['Cumpre requisitos FSMA para importadores dos EUA'],
        validity: 'FFR #18521423952 renovado 2024/2026',
        auditor: 'FDA',
        image: '/lovable-uploads/f5b83a1e-17e8-44ad-9488-ec77c92f3fde.png'
      },
      {
        id: 'kosher',
        name: 'Kosher (OU)',
        scope: 'Pareve — aceito em 100+ países',
        benefits: ['Expande alcance para kosher, veganos e vegetarianos', 'Exigência de muitas redes varejistas dos EUA'],
        validity: 'Auditorias trimestrais do rabino',
        auditor: 'OU Kosher Certification',
        image: '/lovable-uploads/d4acb6d3-1c37-4f94-b53c-e45e68148a24.png'
      },
      {
        id: 'halal',
        name: 'Halal GCC',
        scope: 'GSO 2055-1 – UAE, Arábia Saudita e MENA',
        benefits: ['Portal para 420 milhões de consumidores muçulmanos', 'Selo de pureza e transparência'],
        validity: 'Certificador: AHF (válido até Out/2025)',
        auditor: 'American Halal Foundation',
        image: '/lovable-uploads/d92916bd-d8dc-4369-abc0-d159fb0b9c22.png'
      },
      {
        id: 'nongmo',
        name: 'Non-GMO Project Verified',
        scope: 'EUA e Canadá',
        benefits: ['Garantia de terceiros de ausência de OGM', 'Altamente reconhecido em lojas "naturais/integrais"'],
        validity: 'ID #NGPV-021-CHI-2024 (renovação anual)',
        auditor: 'nongmoproject.org',
        image: '/lovable-uploads/cb524aef-f8ac-4895-b9e7-bafc7c890079.png'
      },
      {
        id: 'gluten',
        name: 'Sem Glúten (Interno)',
        scope: 'Lotes controlados',
        benefits: ['Análises ELISA <10 ppm (glúten)', 'Relatórios no blockchain Hecta'],
        validity: 'Baseado em lote; disponível via QR code',
        auditor: 'Interno',
        image: '/lovable-uploads/663fe5e3-10a8-46e0-a93d-0c592f1a08da.png'
      },
      {
        id: 'smeta',
        name: 'SMETA 4-Pillar',
        scope: 'Auditoria Ética Comercial de Membros Sedex',
        benefits: ['Padrões de trabalho, saúde e segurança', 'Meio ambiente e práticas comerciais éticas'],
        validity: 'Auditoria anual — válida até Set/2025',
        auditor: 'Sedex',
        image: '/lovable-uploads/1b75fca4-2547-4477-9c8e-54aa239b1bc6.png'
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
      },
      {
        question: "A Hecta oferece suporte para auditorias de segunda parte?",
        answer: "Oferecemos salas de reunião virtuais e acesso a relatórios; auditores presenciais podem ser agendados em 30 dias."
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
      },
      {
        id: 'cor',
        name: 'COR Canada',
        scope: 'Canadian Organic Regime — Canada',
        benefits: ['Complies with NOP↔COR bilateral equivalence', 'Access to "Health & Bulk" retailers'],
        validity: 'Certificate #COR-21-247, valid until Feb/2026',
        auditor: 'COR',
        image: '/lovable-uploads/88008385-0722-45be-b132-1c9c65bbcc1d.png'
      },
      {
        id: 'jas',
        name: 'JAS Organic',
        scope: 'Mandatory requirement to label "organic" in Japan',
        benefits: ['Exemption from additional phytosanitary controls', 'Use of JAS logo on packaging'],
        validity: 'MAFF-accredited auditor — valid until Mar/2026',
        auditor: 'MAFF',
        image: '/lovable-uploads/3c1d4c52-aafb-489e-a14d-0e8237afb1c0.png'
      },
      {
        id: 'brcgs',
        name: 'BRCGS Food Safety AA+',
        scope: 'GFSI Global (unannounced audits)',
        benefits: ['Highest level of food safety', 'Reduces need for second-party audits'],
        validity: 'Issued by SGS — AA+ result (surprise audit)',
        auditor: 'Complete Food Safety Ltd',
        image: '/lovable-uploads/9679d345-1d34-4876-b36b-691161019da6.png'
      },
      {
        id: 'fda',
        name: 'FDA FCE/Bio-T',
        scope: 'Food Facility Registration & Acidified Foods',
        benefits: ['Complies with FSMA requirements for US importers'],
        validity: 'FFR #18521423952 renewed 2024/2026',
        auditor: 'FDA',
        image: '/lovable-uploads/f5b83a1e-17e8-44ad-9488-ec77c92f3fde.png'
      },
      {
        id: 'kosher',
        name: 'Kosher (OU)',
        scope: 'Pareve — accepted in 100+ countries',
        benefits: ['Expands reach to kosher, vegan, and vegetarian followers', 'Requirement of many US retail chains'],
        validity: 'Quarterly rabbi audits',
        auditor: 'OU Kosher Certification',
        image: '/lovable-uploads/d4acb6d3-1c37-4f94-b53c-e45e68148a24.png'
      },
      {
        id: 'halal',
        name: 'Halal GCC',
        scope: 'GSO 2055-1 – UAE, Saudi Arabia and MENA',
        benefits: ['Gateway to 420 million Muslim consumers', 'Seal of purity and transparency'],
        validity: 'Certifier: AHF (valid until Oct/2025)',
        auditor: 'American Halal Foundation',
        image: '/lovable-uploads/d92916bd-d8dc-4369-abc0-d159fb0b9c22.png'
      },
      {
        id: 'nongmo',
        name: 'Non-GMO Project Verified',
        scope: 'USA and Canada',
        benefits: ['Third-party guarantee of GMO absence', 'Highly recognized in "natural/whole foods" stores'],
        validity: 'ID #NGPV-021-CHI-2024 (annual renewal)',
        auditor: 'nongmoproject.org',
        image: '/lovable-uploads/cb524aef-f8ac-4895-b9e7-bafc7c890079.png'
      },
      {
        id: 'gluten',
        name: 'Gluten-Free (Internal)',
        scope: 'Controlled batches',
        benefits: ['ELISA analyses <10 ppm (gluten)', 'Reports on Hecta blockchain'],
        validity: 'Batch-based; available via QR code',
        auditor: 'Internal',
        image: '/lovable-uploads/663fe5e3-10a8-46e0-a93d-0c592f1a08da.png'
      },
      {
        id: 'smeta',
        name: 'SMETA 4-Pillar',
        scope: 'Sedex Members Ethical Trade Audit',
        benefits: ['Labor standards, health and safety', 'Environment and ethical business practices'],
        validity: 'Annual audit — valid until Sep/2025',
        auditor: 'Sedex',
        image: '/lovable-uploads/1b75fca4-2547-4477-9c8e-54aa239b1bc6.png'
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
      },
      {
        question: "Does Hecta provide support for second-party audits?",
        answer: "We provide virtual meeting rooms and report access; on-site auditors can be scheduled within 30 days."
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
      },
      {
        id: 'cor',
        name: 'COR加拿大',
        scope: '加拿大有机制度 — 加拿大',
        benefits: ['符合NOP↔COR双边等效要求', '可进入"健康与散装"零售商'],
        validity: '证书 #COR-21-247，有效期至2026年2月',
        auditor: 'COR',
        image: '/lovable-uploads/88008385-0722-45be-b132-1c9c65bbcc1d.png'
      },
      {
        id: 'jas',
        name: 'JAS有机认证',
        scope: '在日本标注"有机"的强制性要求',
        benefits: ['免除额外植物检疫检查', '包装上可使用JAS标志'],
        validity: 'MAFF认可的审核员 — 有效期至2026年3月',
        auditor: 'MAFF',
        image: '/lovable-uploads/3c1d4c52-aafb-489e-a14d-0e8237afb1c0.png'
      },
      {
        id: 'brcgs',
        name: 'BRCGS食品安全AA+',
        scope: 'GFSI全球认证（无预警审核）',
        benefits: ['最高级别的食品安全', '减少对第二方审核的需求'],
        validity: 'SGS颁发 — AA+结果（突击审核）',
        auditor: 'Complete Food Safety Ltd',
        image: '/lovable-uploads/9679d345-1d34-4876-b36b-691161019da6.png'
      },
      {
        id: 'fda',
        name: 'FDA FCE/Bio-T',
        scope: '食品设施注册与酸化食品',
        benefits: ['符合美国进口商FSMA要求'],
        validity: 'FFR #18521423952 已续期 2024/2026',
        auditor: 'FDA',
        image: '/lovable-uploads/f5b83a1e-17e8-44ad-9488-ec77c92f3fde.png'
      },
      {
        id: 'kosher',
        name: '犹太洁食(OU)',
        scope: 'Pareve — 在100多个国家被接受',
        benefits: ['扩大对遵循犹太洁食、纯素食和素食者的覆盖范围', '许多美国零售连锁店的要求'],
        validity: '季度拉比审核',
        auditor: 'OU Kosher Certification',
        image: '/lovable-uploads/d4acb6d3-1c37-4f94-b53c-e45e68148a24.png'
      },
      {
        id: 'halal',
        name: '清真GCC',
        scope: 'GSO 2055-1 – 阿联酋、沙特阿拉伯和中东北非',
        benefits: ['通向4.2亿穆斯林消费者的门户', '纯度和透明度的标志'],
        validity: '认证方: AHF (有效期至2025年10月)',
        auditor: 'American Halal Foundation',
        image: '/lovable-uploads/d92916bd-d8dc-4369-abc0-d159fb0b9c22.png'
      },
      {
        id: 'nongmo',
        name: '非转基因项目验证',
        scope: '美国和加拿大',
        benefits: ['第三方保证不含转基因成分', '在"天然/全食品"商店中高度认可'],
        validity: 'ID #NGPV-021-CHI-2024 (年度更新)',
        auditor: 'nongmoproject.org',
        image: '/lovable-uploads/cb524aef-f8ac-4895-b9e7-bafc7c890079.png'
      },
      {
        id: 'gluten',
        name: '无麸质（内部）',
        scope: '受控批次',
        benefits: ['ELISA分析 <10 ppm（麸质）', 'Hecta区块链上的报告'],
        validity: '基于批次；通过二维码可获取',
        auditor: '内部',
        image: '/lovable-uploads/663fe5e3-10a8-46e0-a93d-0c592f1a08da.png'
      },
      {
        id: 'smeta',
        name: 'SMETA 4支柱',
        scope: 'Sedex成员道德贸易审计',
        benefits: ['劳工标准、健康与安全', '环境和道德商业实践'],
        validity: '年度审核 — 有效期至2025年9月',
        auditor: 'Sedex',
        image: '/lovable-uploads/1b75fca4-2547-4477-9c8e-54aa239b1bc6.png'
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
      },
      {
        question: "Hecta是否为第二方审核提供支持？",
        answer: "我们提供虚拟会议室和报告访问权限；现场审核员可在30天内安排。"
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
      },
      {
        id: 'cor',
        name: 'COR كندا',
        scope: 'النظام العضوي الكندي — كندا',
        benefits: ['يتوافق مع التكافؤ الثنائي NOP↔COR', 'الوصول إلى متاجر "الصحة والسلع"'],
        validity: 'شهادة #COR-21-247، صالحة حتى فبراير/2026',
        auditor: 'COR',
        image: '/lovable-uploads/88008385-0722-45be-b132-1c9c65bbcc1d.png'
      },
      {
        id: 'jas',
        name: 'JAS العضوي',
        scope: 'متطلب إلزامي لوضع علامة "عضوي" في اليابان',
        benefits: ['إعفاء من الضوابط النباتية الإضافية', 'استخدام شعار JAS على العبوة'],
        validity: 'مدقق معتمد من MAFF — صالح حتى مارس/2026',
        auditor: 'MAFF',
        image: '/lovable-uploads/3c1d4c52-aafb-489e-a14d-0e8237afb1c0.png'
      },
      {
        id: 'brcgs',
        name: 'BRCGS سلامة الغذاء AA+',
        scope: 'GFSI العالمي (تدقيق بدون إنذار)',
        benefits: ['أعلى مستوى من سلامة الأغذية', 'يقلل الحاجة لتدقيق الطرف الثاني'],
        validity: 'صادر عن SGS — نتيجة AA+ (تدقيق مفاجئ)',
        auditor: 'Complete Food Safety Ltd',
        image: '/lovable-uploads/9679d345-1d34-4876-b36b-691161019da6.png'
      },
      {
        id: 'fda',
        name: 'FDA FCE/Bio-T',
        scope: 'تسجيل منشأة الغذاء والأغذية المحمضة',
        benefits: ['يتوافق مع متطلبات FSMA للمستوردين الأمريكيين'],
        validity: 'FFR #18521423952 تم تجديده 2024/2026',
        auditor: 'FDA',
        image: '/lovable-uploads/f5b83a1e-17e8-44ad-9488-ec77c92f3fde.png'
      },
      {
        id: 'kosher',
        name: 'كوشر (OU)',
        scope: 'Pareve — مقبول في أكثر من 100 دولة',
        benefits: ['يوسع الوصول لمتبعي الكوشر والنباتيين', 'متطلب العديد من سلاسل التجزئة الأمريكية'],
        validity: 'تدقيق ربع سنوي من الحاخام',
        auditor: 'OU Kosher Certification',
        image: '/lovable-uploads/d4acb6d3-1c37-4f94-b53c-e45e68148a24.png'
      },
      {
        id: 'halal',
        name: 'حلال GCC',
        scope: 'GSO 2055-1 – الإمارات والسعودية ومنطقة الشرق الأوسط وشمال أفريقيا',
        benefits: ['بوابة إلى 420 مليون مستهلك مسلم', 'ختم النقاء والشفافية'],
        validity: 'هيئة التصديق: AHF (صالحة حتى أكتوبر/2025)',
        auditor: 'American Halal Foundation',
        image: '/lovable-uploads/d92916bd-d8dc-4369-abc0-d159fb0b9c22.png'
      },
      {
        id: 'nongmo',
        name: 'مشروع التحقق من غير المعدل وراثيًا',
        scope: 'الولايات المتحدة وكندا',
        benefits: ['ضمان طرف ثالث لغياب الكائنات المعدلة وراثيًا', 'معترف به بدرجة عالية في متاجر "الطبيعي/الأطعمة الكاملة"'],
        validity: 'ID #NGPV-021-CHI-2024 (تجديد سنوي)',
        auditor: 'nongmoproject.org',
        image: '/lovable-uploads/cb524aef-f8ac-4895-b9e7-bafc7c890079.png'
      },
      {
        id: 'gluten',
        name: 'خالي من الجلوتين (داخلي)',
        scope: 'دفعات مراقبة',
        benefits: ['تحاليل ELISA <10 جزء في المليون (جلوتين)', 'تقارير على بلوك تشين Hecta'],
        validity: 'على أساس الدفعة؛ متاح عبر رمز QR',
        auditor: 'داخلي',
        image: '/lovable-uploads/663fe5e3-10a8-46e0-a93d-0c592f1a08da.png'
      },
      {
        id: 'smeta',
        name: 'SMETA 4 أعمدة',
        scope: 'تدقيق التجارة الأخلاقية لأعضاء Sedex',
        benefits: ['معايير العمل والصحة والسلامة', 'البيئة والممارسات التجارية الأخلاقية'],
        validity: 'تدقيق سنوي — صالح حتى سبتمبر/2025',
        auditor: 'Sedex',
        image: '/lovable-uploads/1b75fca4-2547-4477-9c8e-54aa239b1bc6.png'
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
      },
      {
        question: "هل تقدم Hecta الدعم لتدقيق الطرف الثاني؟",
        answer: "نوفر غرف اجتماعات افتراضية والوصول إلى التقارير؛ يمكن جدولة المدققين في الموقع خلال 30 يومًا."
      }
    ]
  }
};

export const getCertificationTranslations = (language: string): CertificationTranslations => {
  return translations[language] || translations['en'];
};
