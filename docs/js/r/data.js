"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countries = exports.regions = exports.types = exports.sectors = void 0;
var sectors = [{
  label: "Animal and vegetable oils, fats and waxes",
  options: [{
    value: "831fe888-5e70-4d2f-8cd1-37d68b6ab8cf",
    label: "Animal oils and fats"
  }, {
    value: "5f13d462-d292-4340-9295-1673e0c2b781",
    label: "Animal or vegetable fats and oils, processed; waxes of animal or vegetable origin; inedible mixtures or preparations of animal or vegetable fats or oils, n.e.s."
  }, {
    value: "a1e0a1e6-013c-43dd-b707-2a4e4d0b852e",
    label: "Fixed vegetable fats and oils, crude, refined or fractionated"
  }]
}, {
  value: "663ae2bf-fc55-4064-a1e2-db0af580b635",
  label: "Beverages and tobacco",
  "class": "first-level",
  options: [{
    value: "80e60b8d-b762-4608-8766-cfd54d3cc282",
    "class": "second-level-last",
    label: "Beverages"
  }, {
    value: "2ee2c112-e8be-44fe-b0d8-13169edcf2f4",
    "class": "second-level-last",
    label: "Tobacco and tobacco manufactures"
  }]
}, {
  value: "83ba4a90-18ee-4a63-bed4-5cea6afc7bd6",
  label: "Chemicals and related products, n.e.s.",
  "class": "first-level",
  options: [{
    value: "9ca4db08-e2d3-4070-b09c-a2eec5ee21d4",
    "class": "second-level-last",
    label: "Chemical materials and products, n.e.s."
  }, {
    value: "78cfb731-52fc-4f9a-a7b4-ea02043a7a65",
    "class": "second-level-last",
    label: "Dyeing, tanning and colouring materials"
  }, {
    value: "c8730a2d-ac99-41f3-8ba8-c463c359b098",
    "class": "second-level-last",
    label: "Essential oils and resinoids and perfume materials; toilet, polishing and cleansing preparations"
  }, {
    value: "e2f8e9bd-7858-49ed-8bfe-116772e235c0",
    "class": "second-level-last",
    label: "Fertilizers (other than those of group 272)"
  }, {
    value: "451260a2-1f64-426b-af33-edfd0f7b261b",
    "class": "second-level-last",
    label: "Inorganic chemicals"
  }, {
    value: "d1cc4143-6e19-412b-b705-aab7c3a5ab85",
    "class": "second-level-last",
    label: "Medicinal and pharmaceutical products"
  }, {
    value: "de67dcb2-e682-4ee0-b01b-f6bb1002b8c2",
    "class": "second-level-last",
    label: "Organic chemicals"
  }, {
    value: "ad6d34ce-65fb-4ec5-bdc0-268e6e5eba5f",
    "class": "second-level-last",
    label: "Plastics in non-primary forms"
  }, {
    value: "529445ba-53e6-4faa-9f48-35618cede471",
    "class": "second-level-last",
    label: "Plastics in primary forms"
  }]
}, {
  value: "b1f6272e-5672-481d-8d06-c531569da45c",
  label: "Commodities and transactions not classified elsewhere in the SITC",
  "class": "first-level",
  options: [{
    value: "3f738294-1e05-4ff0-99ba-7983b5b6c328",
    "class": "second-level-last",
    label: "Coin (other than gold coin), not being legal tender"
  }, {
    value: "dadb2c8c-2d29-4d1c-8270-fa0c946721e7",
    "class": "second-level-last",
    label: "Gold, non-monetary (excluding gold ores and concentrates)"
  }, {
    value: "d37bef45-5c68-47f9-bfd9-c47b0b1d32c0",
    "class": "second-level-last",
    label: "Postal packages not classified according to kind"
  }, {
    value: "8f933f83-263a-4ded-93de-647f56bb65b9",
    "class": "second-level-last",
    label: "Special transactions and commodities not classified according to kind"
  }]
}, {
  value: "ad0d6e26-d1ff-4ed8-8e76-b5d66c4a5159",
  label: "Crude materials, inedible, except fuels",
  "class": "first-level",
  options: [{
    value: "2403af10-fa09-4ba6-9d19-4b6bc0dfab33",
    "class": "second-level-last",
    label: "Cork and wood"
  }, {
    value: "bd88986a-911c-4297-917f-1fc1f1e6fded",
    "class": "second-level-last",
    label: "Crude animal and vegetable materials, n.e.s."
  }, {
    value: "31cf82a7-149f-476c-92b0-eae5e8ca501f",
    "class": "second-level-last",
    label: "Crude fertilizers, other than those of division 56, and crude minerals (excluding coal, petroleum and precious stones)"
  }, {
    value: "a2d73f4f-b6e5-471b-9380-cc06a61ad018",
    "class": "second-level-last",
    label: "Crude rubber (including synthetic and reclaimed)"
  }, {
    value: "c6259cde-f9cd-4bf4-b810-a7fdcbe5da50",
    "class": "second-level-last",
    label: "Hides, skins and furskins, raw"
  }, {
    value: "bda93d6d-8715-4c5b-ad15-81cab5d87505",
    "class": "second-level-last",
    label: "Metalliferous ores and metal scrap"
  }, {
    value: "8fbb01a4-66cf-4700-a6bd-5dafb6486ce3",
    "class": "second-level-last",
    label: "Oil-seeds and oleaginous fruits"
  }, {
    value: "83f48ef5-c5e8-4813-ba8f-ecf10e481357",
    "class": "second-level-last",
    label: "Pulp and waste paper"
  }, {
    value: "6a339fcc-f819-4056-8f05-9e3473191e06",
    "class": "second-level-last",
    label: "Textile fibres (other than wool tops and other combed wool) and their wastes (not manufactured into yarn or fabric)"
  }]
}, {
  value: "cc357bb6-86d8-437b-b8a8-4e239418b8d2",
  label: "Food and live animals",
  "class": "first-level",
  options: [{
    value: "e4d7cdb0-6692-47a1-8ca6-a6d787e4e12d",
    "class": "second-level-last",
    label: "Cereals and cereal preparations"
  }, {
    value: "d2694f12-97e2-4fd9-9187-f45a3f59a5c6",
    "class": "second-level-last",
    label: "Coffee, tea, cocoa, spices, and manufactures thereof"
  }, {
    value: "4e869a4e-ec69-4624-a1ce-11c2b7927067",
    "class": "second-level-last",
    label: "Dairy products and birds&#39; eggs"
  }, {
    value: "a6ee4d25-8f19-494c-908d-2eba133820ad",
    "class": "second-level-last",
    label: "Feeding stuff for animals (not including unmilled cereals)"
  }, {
    value: "b2e2073b-280c-418c-b7d3-249b71d76eef",
    "class": "second-level-last",
    label: "Fish (not marine mammals), crustaceans, molluscs and aquatic invertebrates, and preparations thereof"
  }, {
    value: "93201d7b-686f-452d-9854-441ed3b04444",
    "class": "second-level-last",
    label: "Live animals other than animals of division 03"
  }, {
    value: "8dd6213c-935a-40f5-9096-a8be77969523",
    "class": "second-level-last",
    label: "Meat and meat preparations"
  }, {
    value: "4d835010-7513-481a-9739-076016495e4a",
    "class": "second-level-last",
    label: "Miscellaneous edible products and preparations"
  }, {
    value: "1a4188d3-ca4e-468a-9077-69ab2b7b25de",
    "class": "second-level-last",
    label: "Sugars, sugar preparations and honey"
  }, {
    value: "703953f5-d1ef-4cfb-a377-42282a87a49c",
    "class": "second-level-last",
    label: "Vegetables and fruit"
  }]
}, {
  value: "724fa0de-e1f3-4597-968e-eddd6688a548",
  label: "Machinery and transport equipment",
  "class": "first-level",
  options: [{
    value: "262a7aa9-8305-4312-91e6-1cb0e62d91f6",
    "class": "second-level-last",
    label: "Electrical machinery, apparatus and appliances, n.e.s., and electrical parts thereof (including non-electrical counterparts, n.e.s., of electrical household-type equipment)"
  }, {
    value: "1cb1ef1d-2b3f-4e58-b751-9d67b3e828eb",
    "class": "second-level-last",
    label: "General industrial machinery and equipment, n.e.s., and machine parts, n.e.s."
  }, {
    value: "1b2a04e7-d658-495e-a31f-63bf4b2ddb50",
    "class": "second-level-last",
    label: "Machinery specialized for particular industries"
  }, {
    value: "a55f1477-2799-4ae2-9271-31b4cfb4cd9e",
    "class": "second-level-last",
    label: "Metalworking machinery"
  }, {
    value: "43f1fc4d-256e-4e2d-83ae-4c63a2321fd8",
    "class": "second-level-last",
    label: "Office machines and automatic data-processing machines"
  }, {
    value: "25c2c881-ad52-4822-8868-60f8ccaa9a1a",
    "class": "second-level-last",
    label: "Other transport equipment"
  }, {
    value: "b4b401b7-7169-4783-b990-1c974284bc69",
    "class": "second-level-last",
    label: "Power-generating machinery and equipment"
  }, {
    value: "2d6652bf-f440-41b6-a7a2-1020c2c50834",
    "class": "second-level-last",
    label: "Road vehicles (including air-cushion vehicles)"
  }, {
    value: "4edf0b60-ced4-4ffc-a68b-2c8b7a48982a",
    "class": "second-level-last",
    label: "Telecommunications and sound-recording and reproducing apparatus and equipment"
  }]
}, {
  value: "5730fc7f-0387-46fc-9222-595b1ba819c2",
  label: "Manufactured goods classified chiefly by material",
  "class": "first-level",
  options: [{
    value: "94252a25-4bd1-44ef-af20-79780890b37c",
    "class": "second-level-last",
    label: "Cork and wood manufactures (excluding furniture)"
  }, {
    value: "20aff6ee-de8c-43ce-913d-23145f3222f4",
    "class": "second-level-last",
    label: "Iron and steel"
  }, {
    value: "126ae1f3-932d-42ee-9ec4-44df17ef1189",
    "class": "second-level-last",
    label: "Leather, leather manufactures, n.e.s., and dressed furskins"
  }, {
    value: "513743dd-9ade-46a0-8c06-edc836671c6e",
    "class": "second-level-last",
    label: "Manufactures of metals, n.e.s."
  }, {
    value: "180a500c-4cdf-4c04-934d-c556704018a7",
    "class": "second-level-last",
    label: "Non-ferrous metals"
  }, {
    value: "89c604ca-24a7-440b-b93d-5f5bba151e8b",
    "class": "second-level-last",
    label: "Non-metallic mineral manufactures, n.e.s."
  }, {
    value: "3f2f9fdd-b935-40e1-a947-da1be02ee98d",
    "class": "second-level-last",
    label: "Paper, paperboard and articles of paper pulp, of paper or of paperboard"
  }, {
    value: "6d013c63-9c5f-4458-b560-be106d20e15f",
    "class": "second-level-last",
    label: "Rubber manufactures, n.e.s."
  }, {
    value: "a9205727-b4f1-4682-9911-3ca9449c9e09",
    "class": "second-level-last",
    label: "Textile yarn, fabrics, made-up articles, n.e.s., and related products"
  }]
}, {
  value: "0657d265-fab1-4e94-94ed-af6d88933f94",
  label: "Mineral fuels, lubricants and related materials",
  "class": "first-level",
  options: [{
    value: "238929d7-5a32-483a-ad39-7611c3a879eb",
    "class": "second-level-last",
    label: "Coal, coke and briquettes"
  }, {
    value: "13ab2e82-04d0-481e-b470-651a6742e089",
    "class": "second-level-last",
    label: "Electric current"
  }, {
    value: "3ad501a8-09b7-4977-83a0-153cbb534326",
    "class": "second-level-last",
    label: "Gas, natural and manufactured"
  }, {
    value: "4540795e-3705-4f40-9ef8-a136adf50a04",
    "class": "second-level-last",
    label: "Petroleum, petroleum products and related materials"
  }]
}, {
  value: "67d0edf0-e9a0-4db1-b372-88e0d8edb0d2",
  label: "Miscellaneous manufactured articles",
  "class": "first-level",
  options: [{
    value: "b55d80eb-92ac-425d-8957-73f53082cc28",
    "class": "second-level-last",
    label: "Articles of apparel and clothing accessories"
  }, {
    value: "7d84975a-5d94-44a8-9e4f-9340ee2f76e0",
    "class": "second-level-last",
    label: "Footwear"
  }, {
    value: "224d3c5a-7c53-48cb-8aab-8677e1f6ae06",
    "class": "second-level-last",
    label: "Furniture, and parts thereof; bedding, mattresses, mattress supports, cushions and similar stuffed furnishings"
  }, {
    value: "b3984a03-fc9e-4fd3-8266-2e2f858c2726",
    "class": "second-level-last",
    label: "Miscellaneous manufactured articles, n.e.s."
  }, {
    value: "6f4110d9-cbac-442b-b5de-abeb6809bb2b",
    "class": "second-level-last",
    label: "Photographic apparatus, equipment and supplies and optical goods, n.e.s.; watches and clocks"
  }, {
    value: "f8a662b2-01de-4a9c-96f4-2bf60da2e218",
    "class": "second-level-last",
    label: "Prefabricated buildings; sanitary, plumbing, heating and lighting fixtures and fittings, n.e.s."
  }, {
    value: "fb3c0a42-b5a7-498a-9730-0de7651dd0d4",
    "class": "second-level-last",
    label: "Professional, scientific and controlling instruments and apparatus, n.e.s."
  }, {
    value: "61a0f895-1986-42f1-bb17-d87e5502f224",
    "class": "second-level-last",
    label: "Travel goods, handbags and similar containers"
  }]
}, {
  value: "1f0b3afb-248e-42c3-a123-1446f4d3c5ca",
  label: "N/A",
  "class": "first-level",
  options: []
}, {
  value: "41c966ec-48a8-4b68-9fb4-a6ca51374c55",
  label: "BUSINESS&#160;SERVICES",
  "class": "first-level",
  options: [{
    value: "4ffd315b-de21-4072-87d1-60e345cdb689",
    "class": "second-level",
    label: "Computer and Related Services",
    options: [{
      value: "d2bb2c05-faf3-45dd-b735-97ef1a4e7b44",
      "class": "third-level",
      label: "Consultancy services related to the installation of computer hardware       ",
      options: []
    }, {
      value: "08324325-7b43-4dd5-a4a7-aad5cd3714ee",
      "class": "third-level",
      label: "Data base services",
      options: []
    }, {
      value: "f35cc60c-5d41-4c70-8751-75955c15ead2",
      "class": "third-level",
      label: "Data processing services",
      options: []
    }, {
      value: "df417bb7-705a-4e78-b8af-182cd115e327",
      "class": "third-level",
      label: "Ohter",
      options: []
    }, {
      value: "4d008930-e0cf-4960-a336-66a2c12c959f",
      "class": "third-level",
      label: "Software implementation services",
      options: []
    }]
  }]
}, {
  value: "fa5d876f-b1e7-4894-b9c9-e85dff80981a",
  "class": "second-level",
  label: "Other Business Services",
  options: [{
    value: "1dba80e6-9093-456f-8ed7-e15df19221fb",
    "class": "third-level",
    label: "Advertising services",
    options: []
  }, {
    value: "96c3d6af-db6a-4215-988c-fbcb332e845c",
    "class": "third-level",
    label: "Building-cleaning services",
    options: []
  }, {
    value: "19cef3c7-9905-4adb-b4b1-6bef35f173a6",
    "class": "third-level",
    label: "Convention services",
    options: []
  }, {
    value: "22eafe52-6909-42a6-9e65-cf57723569be",
    "class": "third-level",
    label: "Investigation and security",
    options: []
  }, {
    value: "6d840bf3-5cf2-4d8a-aa64-8f9db43b7306",
    "class": "third-level",
    label: "Maintenance and repair of equipment (not including maritime vessels, aircraftor or other transport equipment)             ",
    options: []
  }, {
    value: "f21af7be-cd15-499e-b8d5-d1092cb00081",
    "class": "third-level",
    label: "Management consulting service",
    options: []
  }, {
    value: "519a63f7-ae54-4014-b115-5d85b9432fc0",
    "class": "third-level",
    label: "Market research and public opinion polling services",
    options: []
  }, {
    value: "bf1c663c-09ed-411c-a4ce-1c39606cb151",
    "class": "third-level",
    label: "Others",
    options: []
  }, {
    value: "50d9fb09-a484-4e7b-96d8-6d102197d168",
    "class": "third-level",
    label: "Packaging services",
    options: []
  }, {
    value: "533573f7-7bb8-46b5-bd1f-7b2fd3dd50c9",
    "class": "third-level",
    label: "Photographic services",
    options: []
  }, {
    value: "445e4401-4f15-48ee-b012-3e596d61f962",
    "class": "third-level",
    label: "Placement and supply services of Personnel",
    options: []
  }, {
    value: "9f2c8cf8-b6ba-4275-9e36-4e69f5393741",
    "class": "third-level",
    label: "Printing, publishing",
    options: []
  }, {
    value: "0b0dd734-aa25-4ad2-8d7e-afd53279396b",
    "class": "third-level",
    label: "Related scientific and technical consulting services",
    options: []
  }, {
    value: "c31d7248-ef6d-4094-a4e5-db209f5ad0bd",
    "class": "third-level",
    label: "Services incidental to agriculture, hunting and forestry",
    options: []
  }, {
    value: "8aea549e-4caf-4388-ad6c-f6b4d58fd505",
    "class": "third-level",
    label: "Services incidental to energy distribution",
    options: []
  }, {
    value: "fa7f409b-08a3-4e01-8e54-f68e56f3d025",
    "class": "third-level",
    label: "Services incidental to fishing",
    options: []
  }, {
    value: "fbc6562c-9576-415d-a0a3-e5fbe6788545",
    "class": "third-level",
    label: "Services incidental to manufacturing",
    options: []
  }, {
    value: "fcc613da-b824-4e2e-81de-dd6a292e5c03",
    "class": "third-level",
    label: "Services incidental to mining",
    options: []
  }, {
    value: "c2f9f020-ae85-4f8d-8a90-d4b10ad1066c",
    "class": "third-level",
    label: "Services related to man. consulting ",
    options: [{
      value: "6cba3e6d-01a7-417a-b53f-3f153be8e20c",
      "class": "third-level",
      label: "Accounting, auditing and bookeeping services     ",
      options: []
    }, {
      value: "4a3c6fda-b026-4a4b-84a3-a331dcd624e7",
      "class": "third-level",
      label: "Architectural services",
      options: []
    }, {
      value: "1051930b-4716-4df4-a7fe-9fdd93ba2d40",
      "class": "third-level",
      label: "Engineering services",
      options: []
    }, {
      value: "35eb3c8a-56bc-4923-9194-457b7ce4c36e",
      "class": "third-level",
      label: "Integrated engineering services",
      options: []
    }, {
      value: "68d88072-02fc-43db-87c0-5b84cb553858",
      "class": "third-level",
      label: "Legal Services",
      options: []
    }, {
      value: "139dcfe0-4cf4-4f28-b627-3ceaae4db948",
      "class": "third-level",
      label: "Medical and dental services",
      options: []
    }, {
      value: "88b3456b-23d9-430d-bf88-11f933dc119a",
      "class": "third-level",
      label: "Other",
      options: []
    }, {
      value: "ecae4a61-92d1-4c1b-8d72-98acb1fc9d44",
      "class": "third-level",
      label: "Services provided by midwives, nurses,physiotherapists and para-medical personnel",
      options: []
    }, {
      value: "989b2bc2-f808-49fa-a327-2a32c3deb7d3",
      "class": "third-level",
      label: "Taxation Services   ",
      options: []
    }, {
      value: "085c58cc-9d45-41ab-96c9-46327e54ef4c",
      "class": "third-level",
      label: "Urban planning and landscape architectural services       ",
      options: []
    }, {
      value: "d15df049-c0b4-4a76-8960-54e51092597f",
      "class": "third-level",
      label: "Veterinary services",
      options: []
    }]
  }]
}, {
  value: "a59a3b9f-53ad-4fe5-acd2-53fc6f1c850a",
  "class": "second-level",
  label: "Professional Services",
  options: []
}, {
  value: "a45375c4-54cc-4d04-bc96-b7557304862a",
  "class": "second-level",
  label: "Real Estate Services",
  options: [{
    value: "154aede1-36ea-4e1c-9a16-537f70186cbd",
    "class": "third-level",
    label: "Involving own or leased property",
    options: []
  }, {
    value: "9f8c00da-fa76-412e-af8f-f56a53f373f2",
    "class": "third-level",
    label: "On a fee or contract basis",
    options: []
  }]
}, {
  value: "84884ca3-431d-4941-adbf-65cf6567e318",
  "class": "second-level",
  label: "Rental/Leasing Services without Operators",
  options: [{
    value: "cf0fee53-5d22-4adc-9da7-6023eeb210b2",
    "class": "third-level",
    label: "Others",
    options: []
  }, {
    value: "f257ae11-3be6-4d57-bfbd-299ee83d12bd",
    "class": "third-level",
    label: "Relating to aircraft",
    options: []
  }, {
    value: "b180cd5d-059c-4f9b-9c53-b1a132d2669a",
    "class": "third-level",
    label: "Relating to other machinery and equipment",
    options: []
  }, {
    value: "02606a49-dcac-457d-8a5b-de41eded251c",
    "class": "third-level",
    label: "Relating to other transport equipment ",
    options: []
  }, {
    value: "8b3bd2c9-61c9-4c99-a278-b65b41283ae9",
    "class": "third-level",
    label: "Relating to ships",
    options: []
  }]
}, {
  value: "7b13c47a-fe7d-4c1e-8e71-da5cc21f7fcd",
  "class": "second-level",
  label: "Research and Development Services",
  options: [{
    value: "a6497fa4-2efa-4973-a45d-09526ecb9f25",
    "class": "third-level",
    label: "Interdisciplinary R&amp;D services",
    options: []
  }, {
    value: "4ac2d90e-dd35-4c2f-9d3e-245d8cb94976",
    "class": "third-level",
    label: "R&amp;D services on social sciences and humanities",
    options: []
  }, {
    value: "df68a78d-7456-47c3-8ec2-4fed6cc6816b",
    "class": "third-level",
    label: "SR&amp;D services on natural sciences",
    options: []
  }]
}];
exports.sectors = sectors;
var types = [{
  label: "National",
  value: "10000000-0000-0000-0000-000000000000",
  options: [{
    isDisabled: true
  }]
}, {
  label: "International",
  value: "00000000-0000-0000-0000-000000000000",
  options: [{
    value: "DTIS",
    label: "DTIS"
  }, {
    value: "NES-ITC",
    label: "NES-ITC"
  }, {
    value: "Other",
    label: "Other"
  }, {
    value: "PRSP",
    label: "PRSP"
  }, {
    value: "SES-ITC",
    label: "SES-ITC"
  }, {
    value: "UNDAF",
    label: "UNDAF"
  }]
}];
exports.types = types;
var regions = [{
  label: "Geographical",
  options: [{
    value: "d380856d-ddca-4995-9cc5-51179abc00f6",
    label: "Africa"
  }, {
    value: "3f5ceef1-92b1-4378-b9d9-8b6486154219",
    label: "America"
  }, {
    value: "1a7644bb-7cab-48d6-be14-a08a987bb394",
    label: "Asia"
  }, {
    value: "a9051429-6a0a-46de-ac0e-f3117cbe5c73",
    label: "Europe"
  }, {
    value: "604fdd0d-ccfb-4c2c-8676-8778e373f3c5",
    label: "Oceania"
  }]
}, {
  label: "Economical",
  options: [{
    value: "b58f9539-de72-486f-91c0-fff9c937508d",
    label: "A.C.P."
  }, {
    value: "c3a3e0a3-91c0-4044-b226-bb451e1551be",
    label: "ACM"
  }, {
    value: "866a404d-9e98-4616-9ab7-358aa541cfbe",
    label: "Agadir"
  }, {
    value: "0d869cb3-5cef-4197-bca7-25e23a861b7d",
    label: "ALADI"
  }, {
    value: "5179b631-a4e5-4270-b588-72ef36bb35a5",
    label: "AMU"
  }, {
    value: "2d8a8037-1522-42fd-af01-a4a36be65617",
    label: "Andean"
  }, {
    value: "2814d5f4-9655-4e12-bc6c-7843320d52db",
    label: "ASEAN"
  }, {
    value: "78727c0d-a8b9-419e-bd17-ce2a05b872d8",
    label: "AU"
  }, {
    value: "8c603fb5-8047-4b00-8bed-7529ab6ca995",
    label: "BSEC"
  }, {
    value: "835f16b9-f155-480c-b833-eaade4438b46",
    label: "CAN"
  }, {
    value: "038d3f4f-1d23-4bd9-8bb8-6f3acecfb50f",
    label: "CAREC"
  }, {
    value: "9f834166-51c1-41d6-9506-e9aa247405d1",
    label: "CARICOM"
  }, {
    value: "9f4913aa-e08f-4b5c-b80f-1d7b4b46d706",
    label: "CARIFORUM"
  }, {
    value: "24735803-e3a4-4e46-a7d1-5be561625f7a",
    label: "CBI"
  }, {
    value: "f08d0b7e-ff15-4d79-ae41-3d2a451d6920",
    label: "CEI"
  }, {
    value: "aedca5f6-77ce-4ad4-8392-d7642e3bf124",
    label: "CEMAC"
  }, {
    value: "48e9e52a-52f0-4976-8722-28dd3369b694",
    label: "CENSAD"
  }, {
    value: "d541999a-e82a-4d1c-903f-d77438d6dff2",
    label: "Central American Common Market (CACM)"
  }, {
    value: "3d76ab7b-e240-455e-a177-f60eb1213326",
    label: "CIS"
  }, {
    value: "346a47da-455a-4998-a2bb-b33fb3749c04",
    label: "COE"
  }, {
    value: "2c2d1ec5-b123-415b-bf1d-67a702e58b2f",
    label: "COMESA"
  }, {
    value: "0c959d5a-7080-459d-bdb3-c9adb53a75ed",
    label: "COMESA (PTA)"
  }, {
    value: "80387468-a73b-47eb-9dd5-b5f3c37755b7",
    label: "COMSEC"
  }, {
    value: "72f7735b-15f3-445c-bff9-9855d70bf294",
    label: "CSATFF"
  }, {
    value: "3e2ad3ea-fee6-4815-a992-721764daf737",
    label: "Customs and Economic Union of Central Africa (CEUCA)"
  }, {
    value: "10d3ee6a-b625-4cd8-8037-19e4ae5cae19",
    label: "Developed Countries"
  }, {
    value: "f281ae6a-a5ab-48ee-be8d-cc16194fc1b6",
    label: "Developing Countries"
  }, {
    value: "a6ecd7e3-95f5-47f5-9dcc-510c4574b5d1",
    label: "EAC"
  }, {
    value: "a41edbb4-29b7-4745-81b0-c6c0bbb64ae3",
    label: "ECCAS"
  }, {
    value: "5b640d13-4368-4be7-a701-68b5a5183681",
    label: "ECO"
  }, {
    value: "dca3cc0b-9ac3-492b-9b52-6d6a609ec488",
    label: "ECOWAS"
  }, {
    value: "d21f0b67-f224-4af9-8d48-4fd778d58945",
    label: "EFTA"
  }, {
    value: "10fe85cf-c8ca-4171-814b-df51b4fe9198",
    label: "EurAsEc/EAEC "
  }, {
    value: "b5ce2d9e-5959-48ea-9cb4-6d8a115856c9",
    label: "European Union"
  }, {
    value: "515c0131-0cc3-4aba-b60c-130d794e577d",
    label: "GAFTA"
  }, {
    value: "446500e2-12f7-417b-8c98-52eb608119e1",
    label: "GCC"
  }, {
    value: "f6c07a7a-59d4-400f-a3a9-4f86947c035f",
    label: "GUUAM"
  }, {
    value: "85d987e9-64d7-431d-95aa-ba823417cb96",
    label: "IGAD"
  }, {
    value: "90b13024-630c-4113-ad6a-a32f8e7eb5a3",
    label: "Land Locked Developing Countries"
  }, {
    value: "19050907-491e-40cc-a686-fc616a3fadf1",
    label: "Latin American Integration Association (LAIA)"
  }, {
    value: "7fe30ab7-4590-4966-a5d3-0756b4e76d39",
    label: "Least Developed Countries"
  }, {
    value: "e20b7dc0-ba1d-438b-adbd-fa405eca69af",
    label: "Maghreb"
  }, {
    value: "9e4568f0-7c18-4a77-b736-8d9a88b59a1f",
    label: "MERCOSUR"
  }, {
    value: "c5c8c4e7-c6fc-4781-b15d-370fc2e0d6eb",
    label: "NAFTA"
  }, {
    value: "d08f5e9c-4eaa-429a-8d1e-e15f4a4032d4",
    label: "OECD"
  }, {
    value: "93fe7c9f-455f-433c-bd8e-547aec5c3395",
    label: "OECS"
  }, {
    value: "eb15334a-a466-4ddc-949d-f3a9e1f9d09a",
    label: "OIC"
  }, {
    value: "41e91a4c-9b6e-45ca-9728-8ed4993e3785",
    label: "OIF"
  }, {
    value: "b939f4a8-76f3-43fa-b3be-0331f630e0ac",
    label: "OPEC"
  }, {
    value: "3965c62c-a46e-4685-aa76-d512f2f4aaec",
    label: "PIFS"
  }, {
    value: "ff21996f-a913-4cc0-b072-681b61bfe2b5",
    label: "RCC"
  }, {
    value: "5d98e469-2f49-49df-82b0-d0a7ee57faa9",
    label: "SAARC"
  }, {
    value: "1c90b34d-ab40-41c9-95e4-44aea4118216",
    label: "SACU"
  }, {
    value: "9f7519e0-b6dd-4ae6-8a6f-bb3d36e4d99f",
    label: "SADC"
  }, {
    value: "9c94cc86-3bfa-4df6-9a6b-4ab21bc73002",
    label: "SCO"
  }, {
    value: "96009f3b-c6fa-46f1-b42e-bb2ab108a81e",
    label: "SEECP"
  }, {
    value: "4b424580-897d-4a05-a5bf-32ca9926eb2c",
    label: "Small Island Developing States"
  }, {
    value: "d19dd8de-25c3-49a7-8d22-6b03139af279",
    label: "SPECA"
  }, {
    value: "1440f7f1-af6f-45ad-84d6-8f41abbc4ec8",
    label: "Sub-Sahara"
  }, {
    value: "7693f8fd-ade6-4ffe-a306-a2c7781f8ef5",
    label: "Transition countries"
  }, {
    value: "11d647a6-6cf8-4a5c-9461-2bb855056980",
    label: "UEMOA"
  }, {
    value: "b83f16a7-94fb-4030-9913-5ba0f49233a5",
    label: "UfM"
  }, {
    value: "2349154c-1218-4e1f-b0d3-173e831748b8",
    label: "UNASUR"
  }]
}];
exports.regions = regions;
var countries = [{
  value: "010d6483-d82d-48de-88c4-030fc5e7f81e",
  label: "Afghanistan"
}, {
  value: "30e154ac-8558-4b33-b4aa-c944bec3eb9b",
  label: "Aland Islands"
}, {
  value: "e2a7c98c-1141-4d24-9ac0-b8d238ba852d",
  label: "Albania"
}, {
  value: "38837eef-de83-4d76-9bea-5adadc54ddb6",
  label: "Algeria"
}, {
  value: "1b2cd850-26dc-4684-b0df-4b78f87eb0ab",
  label: "American Samoa"
}, {
  value: "feef851a-26ab-4fd9-90be-33056585525a",
  label: "Andorra"
}, {
  value: "c709fae3-f171-4185-8990-1ecc3b076f83",
  label: "Angola"
}, {
  value: "80e915ae-17b3-465a-8e73-adfcc5ac3407",
  label: "Anguilla"
}, {
  value: "34a881a1-3438-46e8-8ef3-3b7f5e80bec2",
  label: "Antigua and Barbuda"
}, {
  value: "989ffd50-ddad-4377-9f38-594851db4007",
  label: "Argentina"
}, {
  value: "3dab6c55-3eb2-4e13-930c-3c0dd45aec74",
  label: "Armenia"
}, {
  value: "1e2fba0d-c3a3-48d9-9a09-6e9834a3e91d",
  label: "Aruba"
}, {
  value: "08b28de1-9429-489f-812d-0f8aab1bf1e4",
  label: "Australia"
}, {
  value: "19f57563-c22b-4a1c-abfb-9dcacea4fb7d",
  label: "Austria"
}, {
  value: "e70cf935-885e-4e6b-a2d2-7ea991072302",
  label: "Azerbaijan"
}, {
  value: "270ff05f-587a-4247-b4b5-f8094fc641fc",
  label: "Bahamas"
}, {
  value: "4f9a0932-3f12-448e-a448-c5a5e449297e",
  label: "Bahrain"
}, {
  value: "15481bcb-877e-452e-9717-8a0df63162fa",
  label: "Bangladesh"
}, {
  value: "535cc6a3-2e10-4a05-91e9-5d207d72f922",
  label: "Barbados"
}, {
  value: "0028122d-4ca4-41c3-a52b-544d0e0201b0",
  label: "Belarus"
}, {
  value: "1fa57ba8-99f2-44b4-bca7-57e2681bfc1f",
  label: "Belgium"
}, {
  value: "87fb4b19-1526-495c-b581-f6979038b217",
  label: "Belize"
}, {
  value: "f92d9ea2-2b11-4e20-82c2-09e6edff0401",
  label: "Benin"
}, {
  value: "fab55237-9b0a-42f9-b288-e7fc70e1aad8",
  label: "Bermuda"
}, {
  value: "d74ba23c-50ae-4029-9110-0502368cb5f1",
  label: "Bhutan"
}, {
  value: "a5c611b4-2651-4860-949e-8b2cea6c2607",
  label: "Bolivia (Plurinational State of)"
}, {
  value: "4c508907-e87d-48d1-8e2d-e7f52f5dd4db",
  label: "Bosnia and Herzegovina"
}, {
  value: "9d40483c-63a7-4fe5-a134-0f5a9dc7d1b1",
  label: "Botswana"
}, {
  value: "d8e1bce0-2e94-4847-b4de-77ebd8ae6efc",
  label: "Brazil"
}, {
  value: "787ed301-2abb-4717-9d47-5f3bce00e255",
  label: "British Indian Ocean Territory"
}, {
  value: "0012c666-88a7-4369-9e1b-818c88249daf",
  label: "Brunei Darussalam"
}, {
  value: "1b7ab99c-9ea6-4d46-8b3c-37568d5b6928",
  label: "Bulgaria"
}, {
  value: "1c8a1885-ddfd-4851-a20b-5dca41e0cacb",
  label: "Burkina Faso"
}, {
  value: "1a511184-6309-45fb-9b02-9757c17e2721",
  label: "Burundi"
}, {
  value: "9da0a585-0ddf-4c7c-8c59-7ac29865bce3",
  label: "Cabo Verde"
}, {
  value: "45aae5e2-9845-47db-9322-9a643b88b623",
  label: "Cambodia"
}, {
  value: "dc9049fb-ca15-41ae-aec6-1a4d77824527",
  label: "Cameroon"
}, {
  value: "3529d1f2-0da7-4d02-8924-41a02d62e8cd",
  label: "Canada"
}, {
  value: "bb127239-3cf1-4eda-bb89-4e8757840933",
  label: "Cayman Islands"
}, {
  value: "d37b1038-b22c-43e3-ab77-1276fd9ecadd",
  label: "Central African Republic"
}, {
  value: "2bcfe6d3-4977-4f02-8ff4-ad4cc426e98f",
  label: "Chad"
}, {
  value: "2f0d6482-de6d-48f6-a8bc-681b9a4a33bb",
  label: "Channel Islands"
}, {
  value: "70b8afb5-2201-4b3e-8f24-8214ee594660",
  label: "Chile"
}, {
  value: "0dd83c77-6d72-4705-9d3d-41c3dd29e805",
  label: "China"
}, {
  value: "adec13cb-23a0-4864-a5c0-574f28541e1a",
  label: "Christmas Island"
}, {
  value: "44eccbcf-f4d0-4c2f-afd7-8d5166478c73",
  label: "Cocos (Keeling) Islands"
}, {
  value: "82bb5f6c-151c-4c03-9c67-8edbb1928306",
  label: "Colombia"
}, {
  value: "e2e1e8e6-1c7a-401d-ae7f-9116521b01f7",
  label: "Comoros"
}, {
  value: "290f75f9-afb4-4add-95fd-8fc9132ac56f",
  label: "Congo"
}, {
  value: "2858fa16-2237-4978-962d-fd75c12c2d3f",
  label: "Cook Islands"
}, {
  value: "52767289-1dae-40ef-944d-381e074498b4",
  label: "Costa Rica"
}, {
  value: "4da70af7-c5c2-4320-80f1-a165aed3be7e",
  label: "C&#244;te d&#39;Ivoire"
}, {
  value: "cde54e79-568e-490a-980a-0963b48a76c2",
  label: "Croatia"
}, {
  value: "076ec937-2db2-4b7c-b7f8-962f225e683b",
  label: "Cuba"
}, {
  value: "4638437a-b2ed-4cd9-99c5-55e77f2ca637",
  label: "Cyprus"
}, {
  value: "bfe5adc6-570a-4ec9-9bc6-5efc35d91d3c",
  label: "Czech Republic"
}, {
  value: "dfd49913-4a82-4186-9ace-f370d73a1acf",
  label: "Democratic People&#39;s Republic of Korea (the)"
}, {
  value: "dab64a9e-1ca8-4b81-b077-dfa1ce9cdb1d",
  label: "Democratic Republic of the Congo (the)"
}, {
  value: "75c26550-b301-48ce-a680-96411ad8f6c6",
  label: "Denmark"
}, {
  value: "e4a987d8-b5f1-45e3-bef6-ccb1563c5ffe",
  label: "Djibouti"
}, {
  value: "1d7c3ea9-3d70-48e8-a7c9-9388bf268eb0",
  label: "Dominica"
}, {
  value: "49fce62a-aad5-4675-8871-2b271e63b551",
  label: "Dominican Republic"
}, {
  value: "9fdb1f3f-8eaa-4f7f-aa14-560203da088f",
  label: "Ecuador"
}, {
  value: "afeb4e93-5a90-493e-9e05-3365130b64b9",
  label: "Egypt"
}, {
  value: "138e8bd3-aa7a-4a9b-9de9-987fcf60c3ed",
  label: "El Salvador"
}, {
  value: "157bd994-6b49-4764-a036-128778685850",
  label: "Equatorial Guinea"
}, {
  value: "ad397874-13b3-4064-b824-79decda97e71",
  label: "Eritrea"
}, {
  value: "08a37395-14e7-4fc2-9fac-795cdd828c49",
  label: "Estonia"
}, {
  value: "cdb2bc43-4d6c-4921-a992-6e321ebf88f7",
  label: "Ethiopia"
}, {
  value: "89792f25-6436-4b54-9b1e-558c6f092869",
  label: "Faeroe Islands"
}, {
  value: "f6feebde-2f2a-4d76-a692-d9544a905737",
  label: "Falkland Islands (Malvinas)"
}, {
  value: "743388e7-1bf1-4ff2-bb7e-0c02495dd299",
  label: "Fiji"
}, {
  value: "a68a9fef-3d11-4592-8287-5168ea927559",
  label: "Finland"
}, {
  value: "84dc6b38-fc2e-4e49-a8c5-2356510c128d",
  label: "France"
}, {
  value: "c9ee959d-0910-4dd7-9e7e-0563f6265f5d",
  label: "French Guiana"
}, {
  value: "583d391f-57b4-4f06-aa98-1639d7aa192e",
  label: "French Polynesia"
}, {
  value: "478d3d4c-750b-470f-ae39-f06e615bff9e",
  label: "French Southern and Antarctic Territories"
}, {
  value: "1501a87f-8548-4446-b5f5-c79c812ed91a",
  label: "Gabon"
}, {
  value: "c0a82bd6-0570-4dcf-b988-ee1a13d3c7e0",
  label: "Gambia"
}, {
  value: "d5befb70-f97e-4345-a59e-bc0db305d272",
  label: "Georgia"
}, {
  value: "7bfda050-9cbd-4136-af74-2f3f034b625b",
  label: "Germany"
}, {
  value: "2af5bae7-3361-4bfb-9469-fa1c013a612c",
  label: "Ghana"
}, {
  value: "6d6a234f-2837-4afb-bf31-598bb72bd658",
  label: "Gibraltar"
}, {
  value: "32f80247-34c8-473a-9b12-49f76863cdc6",
  label: "Greece"
}, {
  value: "629dc3b7-4bff-4225-b30c-a3341e93988d",
  label: "Greenland"
}, {
  value: "58ad83dc-6db0-40c9-af95-6e686a22cf56",
  label: "Grenada"
}, {
  value: "6e037946-7379-4713-b920-9e938dd40ffe",
  label: "Guadeloupe"
}, {
  value: "493b21b3-fc45-4be5-975a-0a4f48712097",
  label: "Guam"
}, {
  value: "ef46993b-797a-4c85-8f5b-83325fa0cf93",
  label: "Guatemala"
}, {
  value: "4fe1f1a4-8845-4b81-a832-104a9c5789e5",
  label: "Guernsey"
}, {
  value: "5ff47e2b-8af5-45a2-9097-79079be32014",
  label: "Guinea"
}, {
  value: "9a104d81-56b6-45cb-9be0-bbaf079c1ad8",
  label: "Guinea-Bissau"
}, {
  value: "3f3f1cc9-0028-4c98-be15-28293168f64b",
  label: "Guyana"
}, {
  value: "e4866671-282a-4821-b834-feb6c45c6dd7",
  label: "Haiti"
}, {
  value: "204f795e-1860-4bcd-8522-1ef6facf5c06",
  label: "Holy See"
}, {
  value: "6e8d1eba-0cc8-498d-b8ca-84f89b2adaae",
  label: "Honduras"
}, {
  value: "99ce0cac-5271-4fa9-b2e1-5b2cb2e21db2",
  label: "Hong Kong , SAR China"
}, {
  value: "37d16a2c-28a2-4791-902f-b136f4508df3",
  label: "Hungary"
}, {
  value: "ca65ac5b-79af-4ed5-88ac-c1304e4d2f25",
  label: "Iceland"
}, {
  value: "fc19d4aa-a098-464f-88ff-fdab4b64f166",
  label: "India"
}, {
  value: "abf04d10-a52f-41e7-8346-bbe198b9e92d",
  label: "Indonesia"
}, {
  value: "64b32e34-dfd6-4a8a-bc20-c2fa38c41390",
  label: "Iran (Islamic Republic of)"
}, {
  value: "85228aa1-da3a-4beb-8867-13a5131f17c6",
  label: "Iraq"
}, {
  value: "80da441f-7020-451b-9a56-343ff99a43f1",
  label: "Ireland"
}, {
  value: "5140dfb6-c626-4fd2-aecb-de52412085b0",
  label: "Israel"
}, {
  value: "0da58c13-a1f0-4e28-bae5-e55a009d4c85",
  label: "Italy"
}, {
  value: "dac21ff0-6415-403f-a6f1-4ac7a7741da1",
  label: "Jamaica"
}, {
  value: "9bfd8829-392f-43c1-823d-681593a88a0c",
  label: "Japan"
}, {
  value: "329f3974-be50-4b08-9c5f-66d249447b22",
  label: "Jersey"
}, {
  value: "4d20bded-1b02-47c0-b8bd-02d14d081cfd",
  label: "Jordan"
}, {
  value: "13f77e4d-1a41-45a4-938a-178ef3623ef2",
  label: "Kazakhstan"
}, {
  value: "b64cfacb-1236-448d-8608-814cfa62e683",
  label: "Kenya"
}, {
  value: "16944b59-481e-4c81-aaf4-6e0d41319535",
  label: "Kiribati"
}, {
  value: "099d7c58-3c64-4116-bc66-3369bfe18a0e",
  label: "Kuwait"
}, {
  value: "10301396-7ece-41a1-8d12-43d631fdc2ad",
  label: "Kyrgyzstan"
}, {
  value: "9b682d13-e182-491d-9f21-62c028b9e0a3",
  label: "Lao People&#39;s Democratic Republic"
}, {
  value: "a3671b41-1b9d-4a6d-808e-63eb07b3d87d",
  label: "Latvia"
}, {
  value: "69e0ac35-eca3-46b4-9e94-b5582d55a838",
  label: "Lebanon"
}, {
  value: "b9b32958-3621-44e1-a63b-e3fbcb1f6e38",
  label: "Lesotho"
}, {
  value: "2fb89646-b646-4173-b08f-d496f74a10a4",
  label: "Liberia"
}, {
  value: "0e843b73-cefc-4ed7-a28a-1a6cdaacd780",
  label: "Libya"
}, {
  value: "464e1df9-ea0e-4c66-9b13-5a97adcca80a",
  label: "Liechtenstein"
}, {
  value: "5cb9d909-e11e-410c-90df-e5b4cf5d11d1",
  label: "Lithuania"
}, {
  value: "cd0d702b-a924-4324-8c79-24489a0f1352",
  label: "Luxembourg"
}, {
  value: "44c45147-7de5-47c6-a97a-21587f88104d",
  label: "Macao, SAR China"
}, {
  value: "8751f797-f5c3-4178-b3f1-bb371044c3b7",
  label: "Madagascar"
}, {
  value: "34d13650-6e21-4407-b574-0e2bfa072c33",
  label: "Malawi"
}, {
  value: "bad404ac-a1c9-49bc-900e-ff709ed45481",
  label: "Malaysia"
}, {
  value: "246a69e6-dcb8-4984-9c3e-17e50d65aa28",
  label: "Maldives"
}, {
  value: "6e2c37c0-9e1c-4d06-9745-d84289ece978",
  label: "Mali"
}, {
  value: "772b066c-a3e1-4cff-bf77-28a29281a3b1",
  label: "Malta"
}, {
  value: "da7b7c2e-6315-4fc6-b5c3-89b3bf5e706c",
  label: "Man, Isle of"
}, {
  value: "bb95b65e-b958-474a-aff7-00fa5b87171b",
  label: "Marshall Islands"
}, {
  value: "ae939148-e157-4a53-be86-62a58b371a45",
  label: "Martinique"
}, {
  value: "14446d2f-1cf2-4624-8047-b22a4867870a",
  label: "Mauritania"
}, {
  value: "30e8fad8-edd8-4585-a114-cb3e5cf6ec90",
  label: "Mauritius"
}, {
  value: "58b9fc14-7b3a-4165-937c-c0a5dd064a8e",
  label: "Mayotte"
}, {
  value: "ed581306-e57f-4d1b-82c8-9a005c3f90d3",
  label: "Mexico"
}, {
  value: "c1ea7669-687c-4570-86dc-9ce91814da60",
  label: "Micronesia (Federated States of)"
}, {
  value: "cff70a65-51ba-48fe-96b9-4c74dd5e77a7",
  label: "Monaco"
}, {
  value: "25ceba91-7a7d-4b53-a390-cebd8f5b306b",
  label: "Mongolia"
}, {
  value: "debdc097-257c-45f8-890a-4ac0cfa40345",
  label: "Montenegro"
}, {
  value: "19f41718-551a-4659-b0d3-3e3f9351aa85",
  label: "Montserrat"
}, {
  value: "e0fcb722-bc4d-46da-b93c-877151b8f7e6",
  label: "Morocco"
}, {
  value: "691c1148-603a-40fa-b6c3-40b88452ad53",
  label: "Mozambique"
}, {
  value: "938c2c41-1779-47b3-8213-dc57f6508a1d",
  label: "Myanmar"
}, {
  value: "6ddfbd90-5c29-4828-a83e-03f74b92ae0d",
  label: "Namibia"
}, {
  value: "eaffdd5c-324b-4338-bb09-2a098c101b86",
  label: "Nauru"
}, {
  value: "98195e76-9702-4436-87c3-50065ab87399",
  label: "Nepal"
}, {
  value: "d977ddad-0d9c-4bb2-8b49-2516c72b733a",
  label: "Netherlands"
}, {
  value: "69004c9c-ff19-4731-ac95-441e97d3100a",
  label: "Netherlands Antilles"
}, {
  value: "08ce1a4c-d4d7-4d3a-88c7-515cd451a72d",
  label: "Neutral Zone"
}, {
  value: "15f204bd-6b8f-4483-a3ec-e2093af9ee9e",
  label: "New Caledonia"
}, {
  value: "069aada7-0182-46ac-93bb-1940a4ef6342",
  label: "New Zealand"
}, {
  value: "57cc80d2-ec8c-479b-893a-a88c1161c586",
  label: "Nicaragua"
}, {
  value: "a334f112-6b0f-4731-b453-5a477b370b16",
  label: "Niger"
}, {
  value: "89a42705-425d-4b55-9db7-4d0aa6760709",
  label: "Nigeria"
}, {
  value: "6d62bc6a-4d1c-4968-bbe1-5ac64c587c35",
  label: "Niue"
}, {
  value: "14ec2796-3808-47c7-b617-78f1d3945886",
  label: "Norfolk Island"
}, {
  value: "89c81d8f-a650-4481-a497-294b58228731",
  label: "Northern Mariana Islands"
}, {
  value: "f6828673-4871-4794-87cd-ef54b37de6be",
  label: "Norway"
}, {
  value: "66a41722-6e5e-4b39-8f62-705118a3630d",
  label: "Oman"
}, {
  value: "9bfe9ff6-2150-4ce6-8020-017ea32e1fee",
  label: "Pacific Islands (Trust Territory)"
}, {
  value: "8641f4ae-f4cb-4b4b-85b4-9a9633ad63a7",
  label: "Pakistan"
}, {
  value: "812e2782-2bca-4dd2-aea6-bd56374ca6ee",
  label: "Palau"
}, {
  value: "eb3e22d3-5b2d-46ee-8952-e2d446779567",
  label: "Panama"
}, {
  value: "f67d64ee-f05f-454e-9b6e-7a0e908f294f",
  label: "Papua New Guinea"
}, {
  value: "01ee5242-03e3-4842-8696-88688319e784",
  label: "Paraguay"
}, {
  value: "69ad7c10-405f-4b45-a3ee-fa1a1b21e473",
  label: "Peru"
}, {
  value: "d178fed0-e946-4f12-8603-9222014bd730",
  label: "Philippines"
}, {
  value: "995b0a79-c61a-4726-a56a-7f770c5a8bd6",
  label: "Pitcairn"
}, {
  value: "fc265c4e-463d-4560-9a01-5c95b0c4eb08",
  label: "Poland"
}, {
  value: "3f110d79-c056-4880-b244-ba5234396a0a",
  label: "Portugal"
}, {
  value: "29ef316c-d53e-4926-922d-10b60c42a5b1",
  label: "Puerto Rico"
}, {
  value: "b2a91181-7344-46db-9c21-e7fc04b15c7c",
  label: "Qatar"
}, {
  value: "41f299c9-ab17-4f89-b009-b9ca5a613b6f",
  label: "Republic of Korea (the) "
}, {
  value: "1fc027e8-ee4c-4034-b07a-c5559e446c1d",
  label: "Republic of Moldova (the)"
}, {
  value: "05579606-087f-499c-8d05-18ed42595aba",
  label: "Reunion"
}, {
  value: "93453d3b-2539-460e-8829-dfec0c214696",
  label: "Romania"
}, {
  value: "142f344d-6425-4764-bd7a-cc8a2b18554f",
  label: "Russia"
}, {
  value: "3a04839a-890e-4d7b-bad4-40f29b2b9d3c",
  label: "Rwanda"
}, {
  value: "226d8290-82ae-4bd0-9e79-7744c56f1776",
  label: "Saint Helena"
}, {
  value: "58b6b547-5a53-488c-b941-59a70d2cbb75",
  label: "Saint Kitts and Nevis"
}, {
  value: "8d1d79fe-cddf-4bd4-8469-6c1a8eb36cf2",
  label: "Saint Lucia"
}, {
  value: "4ca0a9a9-645f-4146-99b9-f4c8704731d0",
  label: "Saint Vincent and the Grenadines"
}, {
  value: "7b9afe1b-b47c-4d40-910a-e0181dd7e8bb",
  label: "Samoa"
}, {
  value: "4e14f3aa-f102-4909-8664-70686ebc985d",
  label: "San Marino"
}, {
  value: "c856a955-1551-491e-8b56-22954fa08ebf",
  label: "Sao Tome and Principe"
}, {
  value: "e194f59d-eb57-4d22-b07e-8c561365f3d8",
  label: "Saudi Arabia"
}, {
  value: "694cac88-2693-45cf-bfc7-92901f1c8680",
  label: "Senegal"
}, {
  value: "cbfcd0c7-d34b-4470-8df5-6d4941221810",
  label: "Serbia"
}, {
  value: "5d0a88c7-03d8-431a-b66e-0b518eac8bb0",
  label: "Seychelles"
}, {
  value: "5b6d448f-a386-4587-a399-25aaf6d04a04",
  label: "Sierra Leone"
}, {
  value: "2565fcd9-8110-450f-b49c-969c9882d048",
  label: "Singapore"
}, {
  value: "c33d14cd-f1b8-4a40-a2b4-72b43f72ec00",
  label: "Slovakia"
}, {
  value: "f6c160fc-7e26-45d5-9067-c97f59e64c99",
  label: "Slovenia"
}, {
  value: "c4945a2c-fd3e-48c5-9174-57592a6586fb",
  label: "Solomon Islands"
}, {
  value: "480f6dec-d75c-4bd4-872c-3b419aa70450",
  label: "Somalia"
}, {
  value: "ec06d616-e161-49cf-b6d6-211a3ee491f3",
  label: "South Africa"
}, {
  value: "88a7febf-ed09-4482-96ca-29745759d372",
  label: "South Sudan"
}, {
  value: "0446cda4-6ef0-499a-8c8e-6c2783cc4b64",
  label: "Spain"
}, {
  value: "ce3005f1-67fd-4e54-93fb-9502ab9af088",
  label: "Sri Lanka"
}, {
  value: "500e1717-30d7-4ea0-ab0f-65ce14746238",
  label: "St. Pierre and Miquelon"
}, {
  value: "6ea1a9d8-7a95-4b5c-ad78-91b1baed7f3c",
  label: "State of Palestine"
}, {
  value: "d7e6c682-4fcc-44cd-9efd-ed9e7cd676ea",
  label: "Sudan"
}, {
  value: "7448ec6c-e3f9-4355-8062-2273e19d9886",
  label: "Suriname"
}, {
  value: "cd1358a2-d9c8-4135-b809-069e5945e719",
  label: "Svalbard and Jan Mayen Islands"
}, {
  value: "947c1d0d-fd49-49ac-8d71-857037f470b9",
  label: "Swaziland"
}, {
  value: "fa5a3a2c-fbea-4ad6-8868-f92e34555828",
  label: "Sweden"
}, {
  value: "2922f526-8dd0-473c-b7ff-4c45e16b13bb",
  label: "Switzerland"
}, {
  value: "e701856b-3c58-4e33-926f-670f2a32016e",
  label: "Syrian Arab Republic"
}, {
  value: "ea9bbd2b-bc1a-4b34-b665-9b299dafbb05",
  label: "Taipei Chinese"
}, {
  value: "2881f8c1-951f-40c2-ae24-679447eabf9e",
  label: "Tajikistan"
}, {
  value: "7ec8648e-70d4-4663-8d11-1fd30d1ca571",
  label: "Thailand"
}, {
  value: "ddddcb73-014c-42ef-b84f-ce6df6e023a1",
  label: "The former Yugoslav Republic of Macedonia"
}, {
  value: "29df9f9f-fb79-4da0-8f09-f270143e1e96",
  label: "Timor-Leste"
}, {
  value: "82ecfb01-ec22-4731-ae70-d172eb355b59",
  label: "Togo"
}, {
  value: "0c0ff40b-ff0b-4fd0-b1c3-5840782e8cb9",
  label: "Tokelau"
}, {
  value: "5baf6434-e35d-4677-a40d-12913be2f9d1",
  label: "Tonga"
}, {
  value: "6ddc37e8-8296-4e3b-851b-901393bba74c",
  label: "Trinidad and Tobago"
}, {
  value: "ff50afe1-8f88-4d95-8fe5-04eb8d93af02",
  label: "Tunisia"
}, {
  value: "0e4db025-64fe-44f1-a6d1-58053042ce23",
  label: "Turkey"
}, {
  value: "ab807095-d0a9-403d-9fdc-d638f7fcc87b",
  label: "Turkmenistan"
}, {
  value: "bec5aeb7-a144-4b83-b7d2-0fd6525f42c8",
  label: "Turks and Caicos Islands"
}, {
  value: "3035ca62-2c2b-4b71-8df0-fe335f5750b9",
  label: "Tuvalu"
}, {
  value: "4e5c40d7-ad08-4e17-9ca3-8962b6748951",
  label: "Uganda"
}, {
  value: "cedb2c8f-a45d-4f4d-aaca-5b0fa5c1902e",
  label: "Ukraine"
}, {
  value: "c343abab-a5be-4f49-9c53-36da7b95e29c",
  label: "United Arab Emirates"
}, {
  value: "80f8195a-fb66-4ef5-8048-ce8f26684b11",
  label: "United Kingdom of Great Britain and Northern Ireland (the)"
}, {
  value: "1aeb22e3-7d60-4d6a-a5e2-cda11a6a333f",
  label: "United Republic of Tanzania (the)"
}, {
  value: "97597703-0331-4378-a8a3-f1af387310d8",
  label: "United States"
}, {
  value: "1d661e99-4b84-4a58-811e-ed504e5928c1",
  label: "Uruguay"
}, {
  value: "db540278-9df7-466a-acfa-dbecf36e15cd",
  label: "Uzbekistan"
}, {
  value: "0c2dc7bf-c9d1-4555-b25b-21e431c6c2a3",
  label: "Vanuatu"
}, {
  value: "701382ca-40e0-49cc-beb4-e8870c3a81aa",
  label: "Venezuela (Bolivarian Republic of)"
}, {
  value: "0ca410b2-24f0-46d5-90b3-0cce65951dbf",
  label: "Viet Nam"
}, {
  value: "ef8b9957-efdb-4010-8219-266916031d46",
  label: "Virgin Islands (British)"
}, {
  value: "6b72b1cb-6e95-4f4c-a37e-4032bde723b5",
  label: "Virgin Islands (U.S.)"
}, {
  value: "6b97b1e9-9a2c-463c-9c23-a0d1cd988d20",
  label: "Wallis and Futuna Islands"
}, {
  value: "ba1f957b-71e4-4f37-8cb5-4e336c755979",
  label: "Western Sahara"
}, {
  value: "8ab1c1dd-bf5d-4314-9223-3d1c44f8ea16",
  label: "Yemen"
}, {
  value: "940df73e-bc90-40b2-a499-a1f8a7c53470",
  label: "Zambia"
}, {
  value: "940d48bf-fea6-4a42-9e24-8e5799a3a5c5",
  label: "Zimbabwe"
}];
exports.countries = countries;