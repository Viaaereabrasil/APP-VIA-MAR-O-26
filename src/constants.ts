import { Aircraft, City } from './types';

export const FLEET: Aircraft[] = [
  {
    id: 'r44',
    model: 'Robinson R44',
    type: 'Helicóptero',
    capacity: 3,
    luggage: 'Pequena (10kg/pessoa)',
    range: '560 km',
    pricePerHour: 4700,    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Robinson_R44_II_%28cropped%29.jpg',
    interiorImage: 'https://helipoland.com/wp-content/uploads/2019/11/R44.png',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/d/d5/Robinson_R44_II_%28cropped%29.jpg',
      'https://helipoland.com/wp-content/uploads/2019/11/R44.png',
      'https://aviationstore101.com.br/wp-content/uploads/2023/09/Robinson-R44-Raven-II-A-venda.jpg',
      'https://assets.paramountbusinessjets.com/media/Aircrafts/Robinson_R-44_Raven_II_exterior2.jpg'
    ],
    description: 'Ideal para passeios panorâmicos e traslados curtos com excelente visibilidade.'
  },
  {
    id: 'r66',
    model: 'Robinson R66',
    type: 'Helicóptero',
    capacity: 4,
    luggage: 'Média (12kg/pessoa)',
    range: '650 km',
    pricePerHour: 8800,
    image: 'https://ml.globenewswire.com/Resource/Download/e4c0d461-e677-43f0-bb65-5334fedf6155',
    interiorImage: 'https://www.airport-technology.com/wp-content/uploads/sites/14/2024/11/3-Image-3-8.jpg',
    gallery: [
      'https://ml.globenewswire.com/Resource/Download/e4c0d461-e677-43f0-bb65-5334fedf6155',
      'https://www.airport-technology.com/wp-content/uploads/sites/14/2024/11/3-Image-3-8.jpg',
      'https://aviationstore101.com.br/wp-content/uploads/2024/06/Robinson-Helicopter-R66-2022-1.jpg',
      'https://aeropedia.com.au/wp-content/uploads/2019/05/Robinson-R-66_Aeropedia-The-Encyclopedia-of-Aircraft.jpg'
    ],
    description: 'Versão turbinada do R44, oferecendo mais potência, espaço e conforto para 4 passageiros.'
  },
  {
    id: 'bell206',
    model: 'Bell 206 JetRanger',
    type: 'Helicóptero',
    capacity: 4,
    luggage: 'Média (15kg/pessoa)',
    range: '690 km',
    pricePerHour: 8500,
    image: 'https://aeroaffaires.fr/wp-content/uploads/2019/04/bell-206-jet-ranger-flying.jpg',
    interiorImage: 'https://www.elicompany.it/wp-content/uploads/2022/03/206-pag2.jpg',
    gallery: [
      'https://aeroaffaires.fr/wp-content/uploads/2019/04/bell-206-jet-ranger-flying.jpg',
      'https://www.elicompany.it/wp-content/uploads/2022/03/206-pag2.jpg',
      'https://dlwwkvaei5hfp.cloudfront.net/aircrafts/494/1592336679426548.jpg',
      'https://embarqueoficial.com.br/wp-content/uploads/2024/10/helicoptero-bell-206-taxi-aereo-voo-especificacoes.jpg'
    ],
    description: 'Um clássico da aviação executiva, seguro e versátil para diversas missões.'
  },
  {
    id: 'bell407',
    model: 'Bell 407',
    type: 'Helicóptero',
    capacity: 6,
    luggage: 'Grande (15kg/pessoa)',
    range: '630 km',
    pricePerHour: 5500,
    image: 'https://aristonaviation.com/wp-content/uploads/2023/05/BELL-407-1.jpeg',
    interiorImage: 'https://www.vip-charter-service.com/helicopters/Bell/407/407_Black_Int_01.png',
    gallery: [
      'https://aristonaviation.com/wp-content/uploads/2023/05/BELL-407-1.jpeg',
      'https://www.vip-charter-service.com/helicopters/Bell/407/407_Black_Int_01.png',
      'https://www.aeronavesavenda.com/wp-content/uploads/2025/12/int3-4.jpg',
      'https://i.redd.it/tried-making-a-bell-407-illustration-what-do-you-think-v0-dxacr90px2781.png?width=15000&format=png&auto=webp&s=47d6735006efabd43af6a9e2f4f8d8ab955c82c3'
    ],
    description: 'Helicóptero monoturbina de alta performance, ideal para grupos maiores com luxo e rapidez.'
  },
  {
    id: 'h125',
    model: 'Airbus H125 Esquilo B3',
    type: 'Helicóptero',
    capacity: 5,
    luggage: 'Grande (15kg/pessoa)',
    range: '630 km',
    pricePerHour: 7500,
    image: 'https://embarqueoficial.com.br/wp-content/uploads/2024/07/helicoptero-airbus-h125-voo-aluguel-venda-aeronave-taxi-aereo-fretamento-2.jpg',
    interiorImage: 'https://www.helittehelicopteros.com.br/uploads/gallery/2024/04/helicoptero-h125-b2-2009-2700hs-tt-1712005424-2.jpeg',
    gallery: [
      'https://embarqueoficial.com.br/wp-content/uploads/2024/07/helicoptero-airbus-h125-voo-aluguel-venda-aeronave-taxi-aereo-fretamento-2.jpg',
      'https://www.helittehelicopteros.com.br/uploads/gallery/2024/04/helicoptero-h125-b2-2009-2700hs-tt-1712005424-2.jpeg',
      'https://airjet.com.br/wp-content/uploads/2020/07/esquilo_Interno_01.jpg',
      'https://praetoraviation.com.br/wp-content/uploads/2024/03/434ffff.jpg'
    ],
    description: 'O helicóptero monoturbina mais vendido do mundo, conhecido por sua versatilidade, potência e cabine espaçosa.'
  },
  {
    id: 'a109',
    model: 'Agusta A109 Power',
    type: 'Helicóptero',
    capacity: 6,
    luggage: 'Média (25kg/pessoa)',
    range: '930 km',
    pricePerHour: 14500,
    image: 'https://ifly.gr/wp-content/uploads/agusta-109-power-elite-sx-hgv-ready-to-board-a.jpg',
    interiorImage: 'https://images.aircharterservice.com/global/aircraft-guide/private-charter/agusta-westland-109-power-grand-2.jpg',
    gallery: [
      'https://ifly.gr/wp-content/uploads/agusta-109-power-elite-sx-hgv-ready-to-board-a.jpg',
      'https://images.aircharterservice.com/global/aircraft-guide/private-charter/agusta-westland-109-power-grand-2.jpg',
      'https://machhelicopters.com/wp-content/uploads/2021/03/GOPR0123.jpg',
      'https://aviadores.com.br/wp-content/uploads/Helicoptero-Agusta-A109E-Power-2.jpg?v=1712499216'
    ],
    description: 'Helicóptero biturbina de alta velocidade e luxo, ideal para voos noturnos e condições meteorológicas adversas com máxima segurança.'
  },
  {
    id: 'kingair',
    model: 'King Air C90',
    type: 'Turboélice',
    capacity: 6,
    luggage: 'Grande (20kg/pessoa)',
    range: '1800 km',
    pricePerHour: 20000,
    image: 'https://embarqueoficial.com.br/wp-content/uploads/2025/05/aviao-beechcraft-king-air-c90-taxi-aereo-embarque-oficial-para-toda-santa-catarina-sao-paulo-rio-de-janeiro-balneario-camboriu-trancoso-.jpeg',
    interiorImage: 'https://www.jubilantenpro.com/images/King-Air-C90GTx-interior.jpg',
    gallery: [
      'https://embarqueoficial.com.br/wp-content/uploads/2025/05/aviao-beechcraft-king-air-c90-taxi-aereo-embarque-oficial-para-toda-santa-catarina-sao-paulo-rio-de-janeiro-balneario-camboriu-trancoso-.jpeg',
      'https://www.jubilantenpro.com/images/King-Air-C90GTx-interior.jpg',
      'https://southjets.com/wp-content/uploads/2025/07/25.jpg',
      'https://taxiaereohercules.com.br/wp-content/uploads/2022/12/aviao-king-air.jpg'
    ],
    description: 'Conforto e segurança para viagens regionais com cabine pressurizada.'
  },
  {
    id: 'pc12',
    model: 'Pilatus PC-12',
    type: 'Turboélice',
    capacity: 8,
    luggage: 'Extra Grande (25kg/pessoa)',
    range: '3400 km',
    pricePerHour: 18000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/PC-12.jpg',
    interiorImage: 'https://amaroaviation.com/wp-content/uploads/2023/08/FOTO-01-min-1-1.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fb/PC-12.jpg',
      'https://amaroaviation.com/wp-content/uploads/2023/08/FOTO-01-min-1-1.jpg',
      'https://www.libertyjet.com/img/aircraft/Pilatus-pc-12-ext.jpg',
      'https://planetair.com.br/wp-content/uploads/2024/02/Pilatus-PC-12-47-2014-3-876x535.jpg'
    ],
    description: 'O "canivete suíço" da aviação. Versátil, luxuoso e capaz de operar em pistas curtas.'
  },
  {
    id: 'phenom100',
    model: 'Phenom 100',
    type: 'Jato',
    capacity: 4,
    luggage: 'Média (15kg/pessoa)',
    range: '2100 km',
    pricePerHour: 22500,
    image: 'https://aeromagazine.uol.com.br/media/versions/phenom_100_1_free_big.jpg',
    interiorImage: 'https://aeroin.net/wp-content/uploads/2016/10/Pheom04.jpg',
    gallery: [
      'https://aeromagazine.uol.com.br/media/versions/phenom_100_1_free_big.jpg',
      'https://aeroin.net/wp-content/uploads/2016/10/Pheom04.jpg',
      'https://media.globalmilitary.net/world/images/models/aircraft/profile/phenom-100.webp',
      'https://www.aeroflap.com.br/wp-content/uploads/2024/09/Embraer-P100EX-Brazil-2-1200x800-1.jpg'
    ],
    description: 'Jato executivo leve com design BMW e alta performance para viagens rápidas.'
  },
  {
    id: 'citation',
    model: 'Cessna Citation CJ2',
    type: 'Jato',
    capacity: 9,
    luggage: 'Grande (20kg/pessoa)',
    range: '2900 km',
    pricePerHour: 29600,
    image: 'https://aerovisto.com/wp-content/uploads/3716_HiRes_CessnaCJ2_HH2301.jpg',
    interiorImage: 'https://aeromagazine.uol.com.br/media/_versions/cessna-textron-cj2-c525a-garmin-painel-cockpit_widelg.jpg',
    gallery: [
      'https://aerovisto.com/wp-content/uploads/3716_HiRes_CessnaCJ2_HH2301.jpg',
      'https://l33jets.com/wp-content/uploads/2023/09/Latitude-33-Aviation-2002-Cessna-Citation-CJ2-N35CT.webp',
      'https://premieraviation.com/wp-content/uploads/2017/05/Cesna-Jet-CJ2-Flying-Sunset.jpg',
      'https://aeromagazine.uol.com.br/media/_versions/cessna-textron-cj2-c525a-garmin-painel-cockpit_widelg.jpg'
    ],
    description: 'O Cessna Citation CJ2 oferece maior alcance, velocidade e uma cabine mais espaçosa, sendo a escolha ideal para voos executivos premium.'
  }
];

export const CITIES: City[] = [
  { name: 'Belo Horizonte', state: 'MG', lat: -19.9167, lng: -43.9345 },
  { name: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lng: -43.1729 },
  { name: 'São Paulo', state: 'SP', lat: -23.5505, lng: -46.6333 },
  { name: 'Brasília', state: 'DF', lat: -15.7975, lng: -47.8919 },
  { name: 'Salvador', state: 'BA', lat: -12.9714, lng: -38.5014 },
  { name: 'Curitiba', state: 'PR', lat: -25.4284, lng: -49.2733 },
  { name: 'Florianópolis', state: 'SC', lat: -27.5954, lng: -48.5480 },
  { name: 'Angra dos Reis', state: 'RJ', lat: -23.0067, lng: -44.3181 },
  { name: 'Búzios', state: 'RJ', lat: -22.7561, lng: -41.8884 },
  { name: 'Escarpas do Lago', state: 'MG', lat: -20.6272, lng: -46.1264 },
  { name: 'Trancoso', state: 'BA', lat: -16.5886, lng: -39.0934 },
  { name: 'Barretos', state: 'SP', lat: -20.5572, lng: -48.5678 },
  { name: 'São Luís', state: 'MA', lat: -2.5307, lng: -44.3068 },
  { name: 'Ribeirão Preto', state: 'SP', lat: -21.1704, lng: -47.8103 },
  { name: 'Macaé', state: 'RJ', lat: -22.3708, lng: -41.7869 }
];

export const WHATSAPP_NUMBER = '5531998804720';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
