(ns data.cols
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]))

(def regions #{"Africa" "Europe" "South_America" "North_America" "Asia"})

(def countries (map :value [
                                { :value "010d6483-d82d-48de-88c4-030fc5e7f81e" :label "Afghanistan" }
                                { :value "30e154ac-8558-4b33-b4aa-c944bec3eb9b" :label "Aland Islands" }
                                { :value "e2a7c98c-1141-4d24-9ac0-b8d238ba852d" :label "Albania" }
                                { :value "38837eef-de83-4d76-9bea-5adadc54ddb6" :label "Algeria" }
                                { :value "1b2cd850-26dc-4684-b0df-4b78f87eb0ab" :label "American Samoa" }
                                { :value "feef851a-26ab-4fd9-90be-33056585525a" :label "Andorra" }
                                { :value "c709fae3-f171-4185-8990-1ecc3b076f83" :label "Angola" }
                                { :value "80e915ae-17b3-465a-8e73-adfcc5ac3407" :label "Anguilla" }
                                { :value "34a881a1-3438-46e8-8ef3-3b7f5e80bec2" :label "Antigua and Barbuda" }
                                { :value "989ffd50-ddad-4377-9f38-594851db4007" :label "Argentina" }
                                { :value "3dab6c55-3eb2-4e13-930c-3c0dd45aec74" :label "Armenia" }
                                { :value "1e2fba0d-c3a3-48d9-9a09-6e9834a3e91d" :label "Aruba" }
                                { :value "08b28de1-9429-489f-812d-0f8aab1bf1e4" :label "Australia" }
                                { :value "19f57563-c22b-4a1c-abfb-9dcacea4fb7d" :label "Austria" }
                                { :value "e70cf935-885e-4e6b-a2d2-7ea991072302" :label "Azerbaijan" }
                                { :value "270ff05f-587a-4247-b4b5-f8094fc641fc" :label "Bahamas" }
                                { :value "4f9a0932-3f12-448e-a448-c5a5e449297e" :label "Bahrain" }
                                { :value "15481bcb-877e-452e-9717-8a0df63162fa" :label "Bangladesh" }
                                { :value "535cc6a3-2e10-4a05-91e9-5d207d72f922" :label "Barbados" }
                                { :value "0028122d-4ca4-41c3-a52b-544d0e0201b0" :label "Belarus" }
                                { :value "1fa57ba8-99f2-44b4-bca7-57e2681bfc1f" :label "Belgium" }
                                { :value "87fb4b19-1526-495c-b581-f6979038b217" :label "Belize" }
                                { :value "f92d9ea2-2b11-4e20-82c2-09e6edff0401" :label "Benin" }
                                { :value "fab55237-9b0a-42f9-b288-e7fc70e1aad8" :label "Bermuda" }
                                { :value "d74ba23c-50ae-4029-9110-0502368cb5f1" :label "Bhutan" }
                                { :value "a5c611b4-2651-4860-949e-8b2cea6c2607" :label "Bolivia (Plurinational State of)" }
                                { :value "4c508907-e87d-48d1-8e2d-e7f52f5dd4db" :label "Bosnia and Herzegovina" }
                                { :value "9d40483c-63a7-4fe5-a134-0f5a9dc7d1b1" :label "Botswana" }
                                { :value "d8e1bce0-2e94-4847-b4de-77ebd8ae6efc" :label "Brazil" }
                                { :value "787ed301-2abb-4717-9d47-5f3bce00e255" :label "British Indian Ocean Territory" }
                                { :value "0012c666-88a7-4369-9e1b-818c88249daf" :label "Brunei Darussalam" }
                                { :value "1b7ab99c-9ea6-4d46-8b3c-37568d5b6928" :label "Bulgaria" }
                                { :value "1c8a1885-ddfd-4851-a20b-5dca41e0cacb" :label "Burkina Faso" }
                                { :value "1a511184-6309-45fb-9b02-9757c17e2721" :label "Burundi" }
                                { :value "9da0a585-0ddf-4c7c-8c59-7ac29865bce3" :label "Cabo Verde" }
                                { :value "45aae5e2-9845-47db-9322-9a643b88b623" :label "Cambodia" }
                                { :value "dc9049fb-ca15-41ae-aec6-1a4d77824527" :label "Cameroon" }
                                { :value "3529d1f2-0da7-4d02-8924-41a02d62e8cd" :label "Canada" }
                                { :value "bb127239-3cf1-4eda-bb89-4e8757840933" :label "Cayman Islands" }
                                { :value "d37b1038-b22c-43e3-ab77-1276fd9ecadd" :label "Central African Republic" }
                                { :value "2bcfe6d3-4977-4f02-8ff4-ad4cc426e98f" :label "Chad" }
                                { :value "2f0d6482-de6d-48f6-a8bc-681b9a4a33bb" :label "Channel Islands" }
                                { :value "70b8afb5-2201-4b3e-8f24-8214ee594660" :label "Chile" }
                                { :value "0dd83c77-6d72-4705-9d3d-41c3dd29e805" :label "China" }
                                { :value "adec13cb-23a0-4864-a5c0-574f28541e1a" :label "Christmas Island" }
                                { :value "44eccbcf-f4d0-4c2f-afd7-8d5166478c73" :label "Cocos (Keeling) Islands" }
                                { :value "82bb5f6c-151c-4c03-9c67-8edbb1928306" :label "Colombia" }
                                { :value "e2e1e8e6-1c7a-401d-ae7f-9116521b01f7" :label "Comoros" }
                                { :value "290f75f9-afb4-4add-95fd-8fc9132ac56f" :label "Congo" }
                                { :value "2858fa16-2237-4978-962d-fd75c12c2d3f" :label "Cook Islands" }
                                { :value "52767289-1dae-40ef-944d-381e074498b4" :label "Costa Rica" }
                                { :value "4da70af7-c5c2-4320-80f1-a165aed3be7e" :label "C&#244;te d&#39;Ivoire" }
                                { :value "cde54e79-568e-490a-980a-0963b48a76c2" :label "Croatia" }
                                { :value "076ec937-2db2-4b7c-b7f8-962f225e683b" :label "Cuba" }
                                { :value "4638437a-b2ed-4cd9-99c5-55e77f2ca637" :label "Cyprus" }
                                { :value "bfe5adc6-570a-4ec9-9bc6-5efc35d91d3c" :label "Czech Republic" }
                                { :value "dfd49913-4a82-4186-9ace-f370d73a1acf" :label "Democratic People&#39;s Republic of Korea (the)" }
                                { :value "dab64a9e-1ca8-4b81-b077-dfa1ce9cdb1d" :label "Democratic Republic of the Congo (the)" }
                                { :value "75c26550-b301-48ce-a680-96411ad8f6c6" :label "Denmark" }
                                { :value "e4a987d8-b5f1-45e3-bef6-ccb1563c5ffe" :label "Djibouti" }
                                { :value "1d7c3ea9-3d70-48e8-a7c9-9388bf268eb0" :label "Dominica" }
                                { :value "49fce62a-aad5-4675-8871-2b271e63b551" :label "Dominican Republic" }
                                { :value "9fdb1f3f-8eaa-4f7f-aa14-560203da088f" :label "Ecuador" }
                                { :value "afeb4e93-5a90-493e-9e05-3365130b64b9" :label "Egypt" }
                                { :value "138e8bd3-aa7a-4a9b-9de9-987fcf60c3ed" :label "El Salvador" }
                                { :value "157bd994-6b49-4764-a036-128778685850" :label "Equatorial Guinea" }
                                { :value "ad397874-13b3-4064-b824-79decda97e71" :label "Eritrea" }
                                { :value "08a37395-14e7-4fc2-9fac-795cdd828c49" :label "Estonia" }
                                { :value "cdb2bc43-4d6c-4921-a992-6e321ebf88f7" :label "Ethiopia" }
                                { :value "89792f25-6436-4b54-9b1e-558c6f092869" :label "Faeroe Islands" }
                                { :value "f6feebde-2f2a-4d76-a692-d9544a905737" :label "Falkland Islands (Malvinas)" }
                                { :value "743388e7-1bf1-4ff2-bb7e-0c02495dd299" :label "Fiji" }
                                { :value "a68a9fef-3d11-4592-8287-5168ea927559" :label "Finland" }
                                { :value "84dc6b38-fc2e-4e49-a8c5-2356510c128d" :label "France" }
                                { :value "c9ee959d-0910-4dd7-9e7e-0563f6265f5d" :label "French Guiana" }
                                { :value "583d391f-57b4-4f06-aa98-1639d7aa192e" :label "French Polynesia" }
                                { :value "478d3d4c-750b-470f-ae39-f06e615bff9e" :label "French Southern and Antarctic Territories" }
                                { :value "1501a87f-8548-4446-b5f5-c79c812ed91a" :label "Gabon" }
                                { :value "c0a82bd6-0570-4dcf-b988-ee1a13d3c7e0" :label "Gambia" }
                                { :value "d5befb70-f97e-4345-a59e-bc0db305d272" :label "Georgia" }
                                { :value "7bfda050-9cbd-4136-af74-2f3f034b625b" :label "Germany" }
                                { :value "2af5bae7-3361-4bfb-9469-fa1c013a612c" :label "Ghana" }
                                { :value "6d6a234f-2837-4afb-bf31-598bb72bd658" :label "Gibraltar" }
                                { :value "32f80247-34c8-473a-9b12-49f76863cdc6" :label "Greece" }
                                { :value "629dc3b7-4bff-4225-b30c-a3341e93988d" :label "Greenland" }
                                { :value "58ad83dc-6db0-40c9-af95-6e686a22cf56" :label "Grenada" }
                                { :value "6e037946-7379-4713-b920-9e938dd40ffe" :label "Guadeloupe" }
                                { :value "493b21b3-fc45-4be5-975a-0a4f48712097" :label "Guam" }
                                { :value "ef46993b-797a-4c85-8f5b-83325fa0cf93" :label "Guatemala" }
                                { :value "4fe1f1a4-8845-4b81-a832-104a9c5789e5" :label "Guernsey" }
                                { :value "5ff47e2b-8af5-45a2-9097-79079be32014" :label "Guinea" }
                                { :value "9a104d81-56b6-45cb-9be0-bbaf079c1ad8" :label "Guinea-Bissau" }
                                { :value "3f3f1cc9-0028-4c98-be15-28293168f64b" :label "Guyana" }
                                { :value "e4866671-282a-4821-b834-feb6c45c6dd7" :label "Haiti" }
                                { :value "204f795e-1860-4bcd-8522-1ef6facf5c06" :label "Holy See" }
                                { :value "6e8d1eba-0cc8-498d-b8ca-84f89b2adaae" :label "Honduras" }
                                { :value "99ce0cac-5271-4fa9-b2e1-5b2cb2e21db2" :label "Hong Kong  SAR China" }
                                { :value "37d16a2c-28a2-4791-902f-b136f4508df3" :label "Hungary" }
                                { :value "ca65ac5b-79af-4ed5-88ac-c1304e4d2f25" :label "Iceland" }
                                { :value "fc19d4aa-a098-464f-88ff-fdab4b64f166" :label "India" }
                                { :value "abf04d10-a52f-41e7-8346-bbe198b9e92d" :label "Indonesia" }
                                { :value "64b32e34-dfd6-4a8a-bc20-c2fa38c41390" :label "Iran (Islamic Republic of)" }
                                { :value "85228aa1-da3a-4beb-8867-13a5131f17c6" :label "Iraq" }
                                { :value "80da441f-7020-451b-9a56-343ff99a43f1" :label "Ireland" }
                                { :value "5140dfb6-c626-4fd2-aecb-de52412085b0" :label "Israel" }
                                { :value "0da58c13-a1f0-4e28-bae5-e55a009d4c85" :label "Italy" }
                                { :value "dac21ff0-6415-403f-a6f1-4ac7a7741da1" :label "Jamaica" }
                                { :value "9bfd8829-392f-43c1-823d-681593a88a0c" :label "Japan" }
                                { :value "329f3974-be50-4b08-9c5f-66d249447b22" :label "Jersey" }
                                { :value "4d20bded-1b02-47c0-b8bd-02d14d081cfd" :label "Jordan" }
                                { :value "13f77e4d-1a41-45a4-938a-178ef3623ef2" :label "Kazakhstan" }
                                { :value "b64cfacb-1236-448d-8608-814cfa62e683" :label "Kenya" }
                                { :value "16944b59-481e-4c81-aaf4-6e0d41319535" :label "Kiribati" }
                                { :value "099d7c58-3c64-4116-bc66-3369bfe18a0e" :label "Kuwait" }
                                { :value "10301396-7ece-41a1-8d12-43d631fdc2ad" :label "Kyrgyzstan" }
                                { :value "9b682d13-e182-491d-9f21-62c028b9e0a3" :label "Lao People&#39;s Democratic Republic" }
                                { :value "a3671b41-1b9d-4a6d-808e-63eb07b3d87d" :label "Latvia" }
                                { :value "69e0ac35-eca3-46b4-9e94-b5582d55a838" :label "Lebanon" }
                                { :value "b9b32958-3621-44e1-a63b-e3fbcb1f6e38" :label "Lesotho" }
                                { :value "2fb89646-b646-4173-b08f-d496f74a10a4" :label "Liberia" }
                                { :value "0e843b73-cefc-4ed7-a28a-1a6cdaacd780" :label "Libya" }
                                { :value "464e1df9-ea0e-4c66-9b13-5a97adcca80a" :label "Liechtenstein" }
                                { :value "5cb9d909-e11e-410c-90df-e5b4cf5d11d1" :label "Lithuania" }
                                { :value "cd0d702b-a924-4324-8c79-24489a0f1352" :label "Luxembourg" }
                                { :value "44c45147-7de5-47c6-a97a-21587f88104d" :label "Macao SAR China" }
                                { :value "8751f797-f5c3-4178-b3f1-bb371044c3b7" :label "Madagascar" }
                                { :value "34d13650-6e21-4407-b574-0e2bfa072c33" :label "Malawi" }
                                { :value "bad404ac-a1c9-49bc-900e-ff709ed45481" :label "Malaysia" }
                                { :value "246a69e6-dcb8-4984-9c3e-17e50d65aa28" :label "Maldives" }
                                { :value "6e2c37c0-9e1c-4d06-9745-d84289ece978" :label "Mali" }
                                { :value "772b066c-a3e1-4cff-bf77-28a29281a3b1" :label "Malta" }
                                { :value "da7b7c2e-6315-4fc6-b5c3-89b3bf5e706c" :label "Man Isle of" }
                                { :value "bb95b65e-b958-474a-aff7-00fa5b87171b" :label "Marshall Islands" }
                                { :value "ae939148-e157-4a53-be86-62a58b371a45" :label "Martinique" }
                                { :value "14446d2f-1cf2-4624-8047-b22a4867870a" :label "Mauritania" }
                                { :value "30e8fad8-edd8-4585-a114-cb3e5cf6ec90" :label "Mauritius" }
                                { :value "58b9fc14-7b3a-4165-937c-c0a5dd064a8e" :label "Mayotte" }
                                { :value "ed581306-e57f-4d1b-82c8-9a005c3f90d3" :label "Mexico" }
                                { :value "c1ea7669-687c-4570-86dc-9ce91814da60" :label "Micronesia (Federated States of)" }
                                { :value "cff70a65-51ba-48fe-96b9-4c74dd5e77a7" :label "Monaco" }
                                { :value "25ceba91-7a7d-4b53-a390-cebd8f5b306b" :label "Mongolia" }
                                { :value "debdc097-257c-45f8-890a-4ac0cfa40345" :label "Montenegro" }
                                { :value "19f41718-551a-4659-b0d3-3e3f9351aa85" :label "Montserrat" }
                                { :value "e0fcb722-bc4d-46da-b93c-877151b8f7e6" :label "Morocco" }
                                { :value "691c1148-603a-40fa-b6c3-40b88452ad53" :label "Mozambique" }
                                { :value "938c2c41-1779-47b3-8213-dc57f6508a1d" :label "Myanmar" }
                                { :value "6ddfbd90-5c29-4828-a83e-03f74b92ae0d" :label "Namibia" }
                                { :value "eaffdd5c-324b-4338-bb09-2a098c101b86" :label "Nauru" }
                                { :value "98195e76-9702-4436-87c3-50065ab87399" :label "Nepal" }
                                { :value "d977ddad-0d9c-4bb2-8b49-2516c72b733a" :label "Netherlands" }
                                { :value "69004c9c-ff19-4731-ac95-441e97d3100a" :label "Netherlands Antilles" }
                                { :value "08ce1a4c-d4d7-4d3a-88c7-515cd451a72d" :label "Neutral Zone" }
                                { :value "15f204bd-6b8f-4483-a3ec-e2093af9ee9e" :label "New Caledonia" }
                                { :value "069aada7-0182-46ac-93bb-1940a4ef6342" :label "New Zealand" }
                                { :value "57cc80d2-ec8c-479b-893a-a88c1161c586" :label "Nicaragua" }
                                { :value "a334f112-6b0f-4731-b453-5a477b370b16" :label "Niger" }
                                { :value "89a42705-425d-4b55-9db7-4d0aa6760709" :label "Nigeria" }
                                { :value "6d62bc6a-4d1c-4968-bbe1-5ac64c587c35" :label "Niue" }
                                { :value "14ec2796-3808-47c7-b617-78f1d3945886" :label "Norfolk Island" }
                                { :value "89c81d8f-a650-4481-a497-294b58228731" :label "Northern Mariana Islands" }
                                { :value "f6828673-4871-4794-87cd-ef54b37de6be" :label "Norway" }
                                { :value "66a41722-6e5e-4b39-8f62-705118a3630d" :label "Oman" }
                                { :value "9bfe9ff6-2150-4ce6-8020-017ea32e1fee" :label "Pacific Islands (Trust Territory)" }
                                { :value "8641f4ae-f4cb-4b4b-85b4-9a9633ad63a7" :label "Pakistan" }
                                { :value "812e2782-2bca-4dd2-aea6-bd56374ca6ee" :label "Palau" }
                                { :value "eb3e22d3-5b2d-46ee-8952-e2d446779567" :label "Panama" }
                                { :value "f67d64ee-f05f-454e-9b6e-7a0e908f294f" :label "Papua New Guinea" }
                                { :value "01ee5242-03e3-4842-8696-88688319e784" :label "Paraguay" }
                                { :value "69ad7c10-405f-4b45-a3ee-fa1a1b21e473" :label "Peru" }
                                { :value "d178fed0-e946-4f12-8603-9222014bd730" :label "Philippines" }
                                { :value "995b0a79-c61a-4726-a56a-7f770c5a8bd6" :label "Pitcairn" }
                                { :value "fc265c4e-463d-4560-9a01-5c95b0c4eb08" :label "Poland" }
                                { :value "3f110d79-c056-4880-b244-ba5234396a0a" :label "Portugal" }
                                { :value "29ef316c-d53e-4926-922d-10b60c42a5b1" :label "Puerto Rico" }
                                { :value "b2a91181-7344-46db-9c21-e7fc04b15c7c" :label "Qatar" }
                                { :value "41f299c9-ab17-4f89-b009-b9ca5a613b6f" :label "Republic of Korea (the) " }
                                { :value "1fc027e8-ee4c-4034-b07a-c5559e446c1d" :label "Republic of Moldova (the)" }
                                { :value "05579606-087f-499c-8d05-18ed42595aba" :label "Reunion" }
                                { :value "93453d3b-2539-460e-8829-dfec0c214696" :label "Romania" }
                                { :value "142f344d-6425-4764-bd7a-cc8a2b18554f" :label "Russia" }
                                { :value "3a04839a-890e-4d7b-bad4-40f29b2b9d3c" :label "Rwanda" }
                                { :value "226d8290-82ae-4bd0-9e79-7744c56f1776" :label "Saint Helena" }
                                { :value "58b6b547-5a53-488c-b941-59a70d2cbb75" :label "Saint Kitts and Nevis" }
                                { :value "8d1d79fe-cddf-4bd4-8469-6c1a8eb36cf2" :label "Saint Lucia" }
                                { :value "4ca0a9a9-645f-4146-99b9-f4c8704731d0" :label "Saint Vincent and the Grenadines" }
                                { :value "7b9afe1b-b47c-4d40-910a-e0181dd7e8bb" :label "Samoa" }
                                { :value "4e14f3aa-f102-4909-8664-70686ebc985d" :label "San Marino" }
                                { :value "c856a955-1551-491e-8b56-22954fa08ebf" :label "Sao Tome and Principe" }
                                { :value "e194f59d-eb57-4d22-b07e-8c561365f3d8" :label "Saudi Arabia" }
                                { :value "694cac88-2693-45cf-bfc7-92901f1c8680" :label "Senegal" }
                                { :value "cbfcd0c7-d34b-4470-8df5-6d4941221810" :label "Serbia" }
                                { :value "5d0a88c7-03d8-431a-b66e-0b518eac8bb0" :label "Seychelles" }
                                { :value "5b6d448f-a386-4587-a399-25aaf6d04a04" :label "Sierra Leone" }
                                { :value "2565fcd9-8110-450f-b49c-969c9882d048" :label "Singapore" }
                                { :value "c33d14cd-f1b8-4a40-a2b4-72b43f72ec00" :label "Slovakia" }
                                { :value "f6c160fc-7e26-45d5-9067-c97f59e64c99" :label "Slovenia" }
                                { :value "c4945a2c-fd3e-48c5-9174-57592a6586fb" :label "Solomon Islands" }
                                { :value "480f6dec-d75c-4bd4-872c-3b419aa70450" :label "Somalia" }
                                { :value "ec06d616-e161-49cf-b6d6-211a3ee491f3" :label "South Africa" }
                                { :value "88a7febf-ed09-4482-96ca-29745759d372" :label "South Sudan" }
                                { :value "0446cda4-6ef0-499a-8c8e-6c2783cc4b64" :label "Spain" }
                                { :value "ce3005f1-67fd-4e54-93fb-9502ab9af088" :label "Sri Lanka" }
                                { :value "500e1717-30d7-4ea0-ab0f-65ce14746238" :label "St. Pierre and Miquelon" }
                                { :value "6ea1a9d8-7a95-4b5c-ad78-91b1baed7f3c" :label "State of Palestine" }
                                { :value "d7e6c682-4fcc-44cd-9efd-ed9e7cd676ea" :label "Sudan" }
                                { :value "7448ec6c-e3f9-4355-8062-2273e19d9886" :label "Suriname" }
                                { :value "cd1358a2-d9c8-4135-b809-069e5945e719" :label "Svalbard and Jan Mayen Islands" }
                                { :value "947c1d0d-fd49-49ac-8d71-857037f470b9" :label "Swaziland" }
                                { :value "fa5a3a2c-fbea-4ad6-8868-f92e34555828" :label "Sweden" }
                                { :value "2922f526-8dd0-473c-b7ff-4c45e16b13bb" :label "Switzerland" }
                                { :value "e701856b-3c58-4e33-926f-670f2a32016e" :label "Syrian Arab Republic" }
                                { :value "ea9bbd2b-bc1a-4b34-b665-9b299dafbb05" :label "Taipei Chinese" }
                                { :value "2881f8c1-951f-40c2-ae24-679447eabf9e" :label "Tajikistan" }
                                { :value "7ec8648e-70d4-4663-8d11-1fd30d1ca571" :label "Thailand" }
                                { :value "ddddcb73-014c-42ef-b84f-ce6df6e023a1" :label "The former Yugoslav Republic of Macedonia" }
                                { :value "29df9f9f-fb79-4da0-8f09-f270143e1e96" :label "Timor-Leste" }
                                { :value "82ecfb01-ec22-4731-ae70-d172eb355b59" :label "Togo" }
                                { :value "0c0ff40b-ff0b-4fd0-b1c3-5840782e8cb9" :label "Tokelau" }
                                { :value "5baf6434-e35d-4677-a40d-12913be2f9d1" :label "Tonga" }
                                { :value "6ddc37e8-8296-4e3b-851b-901393bba74c" :label "Trinidad and Tobago" }
                                { :value "ff50afe1-8f88-4d95-8fe5-04eb8d93af02" :label "Tunisia" }
                                { :value "0e4db025-64fe-44f1-a6d1-58053042ce23" :label "Turkey" }
                                { :value "ab807095-d0a9-403d-9fdc-d638f7fcc87b" :label "Turkmenistan" }
                                { :value "bec5aeb7-a144-4b83-b7d2-0fd6525f42c8" :label "Turks and Caicos Islands" }
                                { :value "3035ca62-2c2b-4b71-8df0-fe335f5750b9" :label "Tuvalu" }
                                { :value "4e5c40d7-ad08-4e17-9ca3-8962b6748951" :label "Uganda" }
                                { :value "cedb2c8f-a45d-4f4d-aaca-5b0fa5c1902e" :label "Ukraine" }
                                { :value "c343abab-a5be-4f49-9c53-36da7b95e29c" :label "United Arab Emirates" }
                                { :value "80f8195a-fb66-4ef5-8048-ce8f26684b11" :label "United Kingdom of Great Britain and Northern Ireland (the)" }
                                { :value "1aeb22e3-7d60-4d6a-a5e2-cda11a6a333f" :label "United Republic of Tanzania (the)" }
                                { :value "97597703-0331-4378-a8a3-f1af387310d8" :label "United States" }
                                { :value "1d661e99-4b84-4a58-811e-ed504e5928c1" :label "Uruguay" }
                                { :value "db540278-9df7-466a-acfa-dbecf36e15cd" :label "Uzbekistan" }
                                { :value "0c2dc7bf-c9d1-4555-b25b-21e431c6c2a3" :label "Vanuatu" }
                                { :value "701382ca-40e0-49cc-beb4-e8870c3a81aa" :label "Venezuela (Bolivarian Republic of)" }
                                { :value "0ca410b2-24f0-46d5-90b3-0cce65951dbf" :label "Viet Nam" }
                                { :value "ef8b9957-efdb-4010-8219-266916031d46" :label "Virgin Islands (British)" }
                                { :value "6b72b1cb-6e95-4f4c-a37e-4032bde723b5" :label "Virgin Islands (U.S.)" }
                                { :value "6b97b1e9-9a2c-463c-9c23-a0d1cd988d20" :label "Wallis and Futuna Islands" }
                                { :value "ba1f957b-71e4-4f37-8cb5-4e336c755979" :label "Western Sahara" }
                                { :value "8ab1c1dd-bf5d-4314-9223-3d1c44f8ea16" :label "Yemen" }
                                { :value "940df73e-bc90-40b2-a499-a1f8a7c53470" :label "Zambia" }
                                { :value "940d48bf-fea6-4a42-9e24-8e5799a3a5c5" :label "Zimbabwe" }
                                ]))

(def country-codes #{"UGA" "BEN" "Benin" "ZAF" "ALB" "ARG" "ARM"})

(def titles
  #{"Diagnostic Trade Integration Study - Uganda" "UEMOA Cotton and Textile Strategy" "Southern Africa ADB Regional Integration Strategy Paper" "Government of Albania and United Nations Programme of Cooperation 2012-2016" "UNDAF Argentina 2011-2014" "UNDAF Armenia 2010-2015" "Diagnostic Trade Integration Study - Benin"})
(def descriptions
  #{"The Diagnostic Trade Integration Study provides an analysis of Uganda’s recent economic and trade performance, and it outlines recommendations in order to increase its integration into the world trading system and mainstream good trade policies into national policy-making. In particular the study deals with sub-sector specific as well as economy-wide issues. Among the latter ones, it focuses on power generation, transport and trade facilitation, access to finance, trade policies, regional trade agreements, customs procedures, trade and export development institutions, and sanitary, phyto-sanitary and other standards. Furthermore, the study analyzes Uganda’s access to export markets, concentrating in particular on the European Union and on the potential worldwide developments following the Doha Round. " "The strategy aims to increase exports and productivity of the cotton sector in the UEMOA (Union Economique et Monétaire Ouest-Africaine) countries. The five main strategic objectives are: 1) increasing productivity; 2) improving quality of product; 3) promoting the sales of UEMOA cotton products within the region and abroad; 4) promoting the transformation and update of the production chain; 5) promoting the development of the cotton-seed value chain. The document provides a detailed analysis of the cotton value chain in the UEMOA countries, and it outlines the future prospects of the world cotton market. In addition, it sets a precise framework for the implementation of the strategy." "The document provides an overview of the current political, economic and social context of the region, setting the regional strategic objectives and identifying the key challenges and opportunities. The strategy rotates around two pillars: regional infrastructure and capacity building; and it focuses on areas such as regional transport/trade facilitation infrastructure, regional Energy Development, information and communication technology, support to the CES Tripartite Arrangement, institutional strengthening, trade and transport facilitation and aid for trade. Furthermore, the strategy addresses cross-cutting issues such as gender, environment, climate change, knowledge management and networking, macroeconomic convergence." "The DTIS provides an overview of the current economic situation in Angola and of the main issues regarding poverty and trade. It analyses the key problems affecting infrastructures, trade regime and institutions, commercial barriers, trade facilitation and private sector development. " "The UNDAF outlines four main areas of cooperation between the UN country team and the government of Argentina, namely: 1) sustainable productive development; 2) social inclusion and equality; 3) management and access to social welfare services; 4) institutional development." "The United Nations Development Assistance Framework analyses the current social and economic situation in Armenia, focusing on demography, health systems, education, social protection, gender, governance and capacity development, human rights, environment and disaster management and risk reduction. Hence, it focuses on four main results, namely: 1) Inclusive and sustainable growth is promoted by reducing disparities and expanding economic opportunities for vulnerable groups; 2) Democratic governance is strengthened by improving accountability, promoting institutional and capacity development and expanding people’s participation; 3) Access and quality of social services is improved especially for vulnerable groups; 4) Environment and disaster risk reduction is integrated into national and local development frameworks."})
(def sectors
  #{"Coffee", "Cashew","Farming" , "Lorem", "sector1", "sector2", "sector3", "sector4", "sector5", "sector6", "sector7", "sector8"})
(def types
  #{"National", "International","DTIS" , "NES-ITC", "Other", "PRSP", "SES-ITC", "UNDAF"})
(def years (set (range 2000 2011)))
(def implementation-periods (set (map #(str % "-"(+ % (rand-int 20) )) (range 2000 2011))))
(def last-updates #{"Fry Jul 13 2012" "Thu May 28 2015"})
