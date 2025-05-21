
import { useTranslation } from 'react-i18next';

export interface Certification {
  id: string;
  name: string;
  scope: string;
  benefits: string[];
  validity: string;
  auditor: string;
  image: string;
}

export const useCertifications = () => {
  const { t } = useTranslation(['certifications']);
  
  const certifications: Certification[] = [
    {
      id: 'usda',
      name: 'USDA Organic',
      scope: t('nop_regulation'),
      benefits: [
        t('no_synthetic_pesticides'),
        t('required_for_organic_label')
      ],
      validity: t('usda_validity'),
      auditor: 'AMS',
      image: 'https://www.usda.gov/sites/default/files/usda-logo.png'
    },
    {
      id: 'eu',
      name: t('eu_organic'),
      scope: t('eu_regulation'),
      benefits: [
        t('preferential_eu_entry'),
        t('eligibility_for_organic_claims')
      ],
      validity: t('eu_validity'),
      auditor: 'ECOCERT',
      image: '/lovable-uploads/9e1fcabb-d8c0-4c8e-82cc-9dd2cf53cce0.png'
    },
    {
      id: 'cor',
      name: t('cor_canada'),
      scope: t('canadian_organic_regime'),
      benefits: [
        t('complies_bilateral_equivalence'),
        t('access_health_bulk_retailers')
      ],
      validity: t('cor_validity'),
      auditor: 'COR',
      image: '/lovable-uploads/88008385-0722-45be-b132-1c9c65bbcc1d.png'
    },
    {
      id: 'jas',
      name: t('jas_organic'),
      scope: t('japan_compulsory'),
      benefits: [
        t('exemption_phytosanitary'),
        t('jas_logo_use')
      ],
      validity: t('jas_validity'),
      auditor: 'MAFF',
      image: '/lovable-uploads/3c1d4c52-aafb-489e-a14d-0e8237afb1c0.png'
    },
    {
      id: 'brcgs',
      name: t('brcgs_food_safety'),
      scope: t('gfsi_global'),
      benefits: [
        t('maximum_food_safety'),
        t('reduces_second_audits')
      ],
      validity: t('brcgs_validity'),
      auditor: 'Complete Food Safety Ltd',
      image: '/lovable-uploads/9679d345-1d34-4876-b36b-691161019da6.png'
    },
    {
      id: 'fda',
      name: 'FDA FCE/Bio-T',
      scope: t('fda_registration'),
      benefits: [
        t('fsma_compliance')
      ],
      validity: t('fda_validity'),
      auditor: 'FDA',
      image: '/lovable-uploads/f5b83a1e-17e8-44ad-9488-ec77c92f3fde.png'
    },
    {
      id: 'kosher',
      name: 'Kosher (OU)',
      scope: t('kosher_scope'),
      benefits: [
        t('kosher_reach'),
        t('kosher_requirement')
      ],
      validity: t('kosher_validity'),
      auditor: 'OU Kosher Certification',
      image: '/lovable-uploads/d4acb6d3-1c37-4f94-b53c-e45e68148a24.png'
    },
    {
      id: 'halal',
      name: 'Halal GCC',
      scope: t('halal_scope'),
      benefits: [
        t('halal_gateway'),
        t('halal_seal')
      ],
      validity: t('halal_validity'),
      auditor: 'American Halal Foundation',
      image: '/lovable-uploads/d92916bd-d8dc-4369-abc0-d159fb0b9c22.png'
    },
    {
      id: 'nongmo',
      name: 'Non-GMO Project Verified',
      scope: t('nongmo_scope'),
      benefits: [
        t('nongmo_guarantee'),
        t('nongmo_acceptance')
      ],
      validity: t('nongmo_validity'),
      auditor: 'nongmoproject.org',
      image: '/lovable-uploads/cb524aef-f8ac-4895-b9e7-bafc7c890079.png'
    },
    {
      id: 'gluten',
      name: t('gluten_title'),
      scope: t('controlled_batches'),
      benefits: [
        t('elisa_analyses'),
        t('blockchain_reports')
      ],
      validity: t('batch_based'),
      auditor: t('internal'),
      image: '/lovable-uploads/663fe5e3-10a8-46e0-a93d-0c592f1a08da.png'
    }
  ];

  return { certifications };
};
