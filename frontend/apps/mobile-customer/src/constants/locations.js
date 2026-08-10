// ✅ Nepal Ko Sabai Districts (77)
export const DISTRICTS = [
  // Province 1
  'Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang', 'Okhaldhunga', 
  'Panchthar', 'Sankhuwasabha', 'Solukhumbu', 'Sunsari', 'Taplejung', 
  'Terhathum', 'Udayapur',
  
  // Province 2
  'Bara', 'Dhanusa', 'Mahottari', 'Parsa', 'Rautahat', 'Saptari', 'Sarlahi', 'Siraha',
  
  // Bagmati Province
  'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 'Kavrepalanchok', 
  'Lalitpur', 'Makwanpur', 'Nuwakot', 'Ramechhap', 'Rasuwa', 'Sindhuli', 
  'Sindhupalchok',
  
  // Gandaki Province
  'Baglung', 'Gorkha', 'Kaski', 'Lamjung', 'Manang', 'Mustang', 'Myagdi', 
  'Nawalpur', 'Parbat', 'Syangja', 'Tanahun',
  
  // Lumbini Province
  'Arghakhanchi', 'Banke', 'Bardiya', 'Dang', 'Eastern Rukum', 'Gulmi', 
  'Kapilvastu', 'Palpa', 'Parasi', 'Pyuthan', 'Rolpa', 'Rupandehi',
  
  // Karnali Province
  'Dailekh', 'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 'Kalikot', 'Mugu', 
  'Surkhet', 'Western Rukum',
  
  // Sudurpaschim Province
  'Achham', 'Baitadi', 'Bajhang', 'Bajura', 'Dadeldhura', 'Darchula', 
  'Doti', 'Kailali', 'Kanchanpur',
];

// ✅ Major Cities with Districts mapping
export const CITIES = {
  'Kathmandu': ['Kathmandu', 'Lalitpur', 'Bhaktapur'],
  'Pokhara': ['Kaski'],
  'Chitwan': ['Chitwan'],
  'Butwal': ['Rupandehi'],
  'Nepalgunj': ['Banke'],
  'Biratnagar': ['Morang'],
  'Dharan': ['Sunsari'],
  'Janakpur': ['Dhanusa'],
  'Hetauda': ['Makwanpur'],
  'Bharatpur': ['Chitwan'],
};

export default { DISTRICTS, CITIES };
