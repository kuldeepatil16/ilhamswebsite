INSERT INTO brand_partners (name, sort_order) VALUES
('Whirlpool', 1),
('Samsung', 2),
('Ariston', 3),
('Bosch', 4),
('AUX', 5),
('LG', 6),
('Daikin', 7),
('Carrier', 8);

INSERT INTO products (
  slug, category, brand,
  name_fr, name_ar, name_en,
  description_fr, description_ar, description_en,
  price_mad, price_display_fr, price_display_ar, price_display_en,
  is_featured, is_active, sort_order
) VALUES
('split-ac', 'climatisation', 'AUX', 'Climatiseur Split', 'مكيف سبليت', 'Split AC', 'Climatiseur mural haute performance.', 'مكيف جداري عالي الأداء.', 'High-efficiency wall-mounted AC.', 3500, 'À partir de 3 500 MAD', 'ابتداءً من 3,500 درهم', 'From 3,500 MAD', true, true, 1),
('solar-water-heater', 'solar', 'Ariston', 'Chauffe-eau solaire', 'سخان مياه شمسي', 'Solar Water Heater', 'Système solaire thermique économique.', 'نظام شمسي حراري اقتصادي.', 'Efficient thermal solar system.', 5000, 'À partir de 5 000 MAD', 'ابتداءً من 5,000 درهم', 'From 5,000 MAD', true, true, 2),
('washing-machine', 'washing_machine', 'Samsung', 'Machine à laver', 'غسالة', 'Washing Machine', 'Capacité famille, faible consommation.', 'سعة عائلية واستهلاك منخفض.', 'Family-size and low consumption.', 3200, 'À partir de 3 200 MAD', 'ابتداءً من 3,200 درهم', 'From 3,200 MAD', true, true, 3),
('refrigerator', 'refrigeration', 'Whirlpool', 'Réfrigérateur', 'ثلاجة', 'Refrigerator', 'Réfrigérateur résidentiel et commercial.', 'ثلاجة منزلية وتجارية.', 'Residential and commercial fridge.', 4000, 'À partir de 4 000 MAD', 'ابتداءً من 4,000 درهم', 'From 4,000 MAD', true, true, 4),
('dishwasher', 'dishwasher', 'Bosch', 'Lave-vaisselle', 'غسالة صحون', 'Dishwasher', 'Lave-vaisselle silencieux et durable.', 'غسالة صحون هادئة ومتينة.', 'Quiet and durable dishwasher.', 4500, 'À partir de 4 500 MAD', 'ابتداءً من 4,500 درهم', 'From 4,500 MAD', true, true, 5),
('freezer', 'freezer', 'LG', 'Congélateur', 'مجمد', 'Freezer', 'Congélateur vertical grande capacité.', 'مجمد عمودي بسعة كبيرة.', 'Large-capacity upright freezer.', 2800, 'À partir de 2 800 MAD', 'ابتداءً من 2,800 درهم', 'From 2,800 MAD', true, true, 6);

INSERT INTO spare_parts (
  slug, part_number, compatible_brands, compatible_categories,
  name_fr, name_ar, name_en,
  description_fr, description_ar, description_en,
  price_mad, in_stock, is_active, sort_order
) VALUES
('ac-compressor', 'COMP-AC-001', ARRAY['whirlpool','samsung','daikin'], ARRAY['climatisation'::product_category], 'Compresseur AC', 'ضاغط مكيف', 'AC Compressor', 'Compresseur pour climatiseur split.', 'ضاغط لمكيف سبليت.', 'Compressor for split AC units.', 1200, true, true, 1),
('r410a-gas', 'GAS-R410A', ARRAY['aux','carrier','lg'], ARRAY['climatisation'::product_category], 'Gaz R410A', 'غاز R410A', 'R410A Gas', 'Recharge gaz R410A.', 'إعادة تعبئة غاز R410A.', 'R410A refill.', 450, true, true, 2),
('wm-motor', 'MOT-WM-230', ARRAY['whirlpool','samsung','bosch'], ARRAY['washing_machine'::product_category], 'Moteur machine à laver', 'محرك غسالة', 'Washing Machine Motor', 'Moteur pour lave-linge.', 'محرك للغسالة.', 'Motor for washing machine.', 980, true, true, 3),
('thermostat-universal', 'THERM-UNI-1', ARRAY['ariston','bosch','lg'], ARRAY['refrigeration'::product_category,'water_heater'::product_category], 'Thermostat universel', 'ثرموستات عالمي', 'Universal Thermostat', 'Thermostat pour froid et chauffe-eau.', 'ثرموستات للتبريد وسخان المياه.', 'Thermostat for refrigeration/water heater.', 220, true, true, 4),
('ac-remote', 'REMOTE-AC-01', ARRAY['aux','daikin','carrier'], ARRAY['climatisation'::product_category], 'Télécommande AC', 'ريموت مكيف', 'AC Remote Control', 'Télécommande de remplacement.', 'جهاز تحكم بديل.', 'Replacement remote.', 180, true, true, 5),
('water-pump', 'PUMP-WTR-10', ARRAY['ariston','bosch','whirlpool'], ARRAY['dishwasher'::product_category,'washing_machine'::product_category], 'Pompe à eau', 'مضخة مياه', 'Water Pump', 'Pompe pour appareils ménagers.', 'مضخة للأجهزة المنزلية.', 'Pump for home appliances.', 260, true, true, 6);

INSERT INTO blog_posts (
  slug,
  title_fr, title_ar, title_en,
  excerpt_fr, excerpt_ar, excerpt_en,
  content_fr, content_ar, content_en,
  tags, is_published, published_at
) VALUES
(
  'choisir-climatiseur-maroc',
  'Comment choisir le bon climatiseur pour votre maison au Maroc',
  'كيف تختار المكيف المناسب لمنزلك في المغرب',
  'How to choose the right AC for your home in Morocco',
  'Guide pratique pour bien dimensionner votre climatiseur.',
  'دليل عملي لاختيار سعة المكيف المناسبة.',
  'Practical guide to size your AC correctly.',
  '# Choisir un climatiseur\n\nÉvaluez la surface, l''isolation et l''orientation.',
  '# اختيار المكيف\n\nقيّم المساحة والعزل واتجاه المنزل.',
  '# Choosing an AC\n\nEvaluate area, insulation and sun exposure.',
  ARRAY['climatisation','guide'], true, NOW()
),
(
  'chauffe-eau-solaire-vs-electrique',
  'Chauffe-eau solaire vs électrique : comparaison des coûts',
  'سخان شمسي أم كهربائي: مقارنة التكاليف',
  'Solar vs electric water heater: cost comparison',
  'Analyse simple des coûts d''installation et d''usage.',
  'تحليل مبسط لتكاليف التركيب والاستهلاك.',
  'Simple analysis of setup and running costs.',
  '# Solaire vs Électrique\n\nLe solaire réduit la facture annuelle.',
  '# شمسي أم كهربائي\n\nالسخان الشمسي يقلل الفاتورة السنوية.',
  '# Solar vs Electric\n\nSolar usually lowers yearly bills.',
  ARRAY['solar','comparison'], true, NOW()
),
(
  'guide-entretien-climatiseur',
  'Guide d''entretien de votre climatiseur',
  'دليل صيانة المكيف',
  'AC maintenance guide',
  'Checklist d''entretien saisonnier pour prolonger la durée de vie.',
  'قائمة صيانة موسمية لإطالة عمر الجهاز.',
  'Seasonal maintenance checklist for longer AC life.',
  '# Entretien climatiseur\n\nNettoyez les filtres et planifiez une maintenance annuelle.',
  '# صيانة المكيف\n\nنظف الفلاتر وجدول صيانة سنوية.',
  '# AC maintenance\n\nClean filters and schedule yearly service.',
  ARRAY['maintenance','ac'], true, NOW()
);

INSERT INTO site_settings (key, value) VALUES
('company_contact', '{"phone_numbers": ["0663572130", "0637237869"], "fax": "0539982020", "email": "vereenelectrofroid@gmail.com", "address": "Al Hoceima, Maroc", "whatsapp": "212663572130", "instagram": "@ste.vereen_electrofroid"}');
