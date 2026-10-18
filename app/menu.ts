export const categories = [ ['الكل','All dishes'], ['محاشي مشكلة','Stuffed vegetables'], ['لحوم','Meats'], ['دواجن','Poultry'], ['مكرونات وطواجن','Pasta & trays'] ];
export const menu = [
['ورق عنب محشي','Stuffed grape leaves',235,1],['محاشي مشكلة','Mixed stuffed vegetables',225,1],['كرنب محشي','Stuffed cabbage',220,1],['ممبار','Mombar',320,1],
['حمام محشي أرز','Stuffed pigeon with rice',350,2],['حمام كداب','Mock pigeon',350,2],['كفتة جملي بالأرز','Camel kofta with rice',500,2],['بوفتيك لحم متبل','Seasoned beef steak',650,2],['كبدة مشوية','Grilled liver',700,2],['حواوشي','Hawawshi',115,2],['شاورما لحم','Beef shawarma',600,2],
['بانيه متبل ومحمر','Breaded & seasoned pane',370,3],['بانيه جاهز للشوي','Ready-to-grill pane',370,3],['كوردون بلو','Cordon bleu',500,3],['شيش طاووق','Shish kebabs',380,3],['شيش طاووق متبل','Seasoned tawook shish',350,3],['شاورما دجاج','Chicken shawarma',370,3],['دجاج جاهز للشوي','Ready-to-grill chicken',350,3],
['مكرونة نجرسكو','Negresco pasta',350,4],['مكرونة بشاميل','Bechamel pasta',350,4],['كوسة بشاميل','Bechamel zucchini',350,4],['جلاش ميكس جبن','Mixed cheese goulash',300,4],['جلاش باللحمة المفرومة','Minced meat goulash',300,4]
] as const;

/** Portion covered by each listed price and each basket unit. */
export function portionLabel(category: number, english: boolean): string {
  return category === 4
    ? (english ? 'Serves 4 people' : 'تكفي ٤ أشخاص')
    : (english ? 'Weight: 1 kg' : 'الوزن: ١ كيلو');
}
