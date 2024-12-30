
var songrun = false;
var count = 1;
var mod = 1;
var emotionCaptured = false; // Variable to track if emotion has been captured
var emotionPlaylist = []; // Playlist of songs belonging to the captured emotion
var currentSongIndex = 0; // Index of the currently playing song
let isEmotionModePlaying = false;
let currentEmotion = null;
var isEmotionDetectionRunning = false;


//angry //Happy //sad  //neutral
//song paths
var path = [
	"songs\\BoDleasons.mp3" //1     				//start of songs for angry mood
	, "songs\\reverie-scott-buckley.mp3" //2
	, "songs\\Moonset.mp3" //3
	, "songs\\Moon-Dock.mp3" //4
	, "songs\\Out_There.mp3" //5
	, "songs\\Inspiring.mp3" //6
	, "songs\\Forest-of-dreams.mp3" //7
	, "songs\\glow.mp3" //8
	, "songs\\wanderlust.mp3" //9
	, "songs\\Grass.mp3" //10
	, "songs\\Morning-in-the-forest.mp3" //11
	, "songs\\Dreams-in-nature.mp3" //12
	, "songs\\Old-oak.mp3" //13
	, "songs\\Lights.mp3" //14
	, "songs\\Sakura-Girl-After-All.mp3" //15
	, "songs\\Sakura-Girl-Morning-Coffee.mp3" //16
	, "songs\\roa.mp3" //17
	, "songs\\Follow-The-Sun.mp3" //18
	, "songs\\summer-madness.mp3" //19
	, "songs\\Colorful-Flowers.mp3" //20
	, "songs\\Inspire.mp3" //21
	, "songs\\Jaipur.mp3" //22
	, "songs\\Humsafar.mp3" //23
	, "songs\\borrow-the-happiness.mp3" //24
	, "songs\\Safar.mp3" //25
	, "songs\\marathon.mp3" //26
	, "songs\\ray-of-hope.mp3" //27
	, "songs\\reality.mp3" //28
	, "songs\\Autumn-Scene.mp3" //29
	, "songs\\keys-of-moon-white-petals.mp3" //30     				//end of songs for angry mood
	, "songs\\Tum Jo Aaye.mp3" //1      						//start of songs for happy mood
	, "songs\\Maan Meri Jaan.mp3" //2
	, "songs\\Badtameez Dil.mp3" //3
	, "songs\\Therapy.mp3" //4
	, "songs\\Lagdi Lahore Di.mp3" //5
	, "songs\\Smack-That.mp3" //6
	, "songs\\Kuch-Is-Tarah.mp3" //7
	, "songs\\Happy Hour.mp3" //8
	, "songs\\Tumhari Mast Aankhon Ne.mp3" //9
	, "songs\\Lut Gaye.mp3" //10
	, "songs\\Thoda Thoda Pyar.mp3" //11
	, "songs\\Halki Si Barsaat.mp3" //12
	, "songs\\Tum Mile.mp3" //13
	, "songs\\Gerua.mp3" //14
	, "songs\\Khamoshiyan.mp3" //15
	, "songs\\Aye Khuda Gir Gaya.mp3" //16
	, "songs\\Sun Sun Barsat Ki Dhun.mp3" //17
	, "songs\\Sab Tera.mp3" //18
	, "songs\\Phir Aur Kya Chahiye.mp3" //19
	, "songs\\Ek Toh Kum Zindagani.mp3" //20
	, "songs\\Kinna Sona.mp3" //21
	, "songs\\Ra Ra Rakkamma.mp3" //22
	, "songs\\Mere Mehboob Qayamat Hogi.mp3" //23
	, "songs\\Ve Haniya.mp3" //24
	, "songs\\Machayenge.mp3" //25
	, "songs\\Firse Machayenge.mp3" //26
	, "songs\\Tera Yaar Hoon Main.mp3" //27
	, "songs\\Nashe Si Chadh Gayi.mp3" //28
	, "songs\\Lungi Dance.mp3" //29
	, "songs\\Bol-Na-Halke-Halke.mp3" //30      						//end of songs for happy mood
	, "songs\\Kabhi-Kabhi-Aditi-Zindagi.mp3" //1						//start of songs for sad mood
	, "songs\\Ajab Si.mp3" //2
	, "songs\\Love you zindagi.mp3" //3
	, "songs\\Deewangi Deewangi.mp3" //4
	, "songs\\Itni Si Hasi.mp3" //5
	, "songs\\Chaleya.mp3" //6
	, "songs\\I Guess.mp3" //7
	, "songs\\Pehle Bhi Main.mp3" //8
	, "songs\\Abhi Mujh Mein Kahin.mp3" //9
	, "songs\\Kun Faaya Kun.mp3" //10
	, "songs\\Urvashi Urvashi.mp3" //11
	, "songs\\Balam Pichkari.mp3" //12
	, "songs\\DJ Waley Babu.mp3" //13
	, "songs\\Levitating.mp3" //14
	, "songs\\Amplifier.mp3" //15
	, "songs\\K-Naan-Wavin-Flag.mp3" //16
	, "songs\\Teri Adaaon Se Dilkash Khatao.mp3" //17
	, "songs\\High Heels.mp3" //18
	, "songs\\Jeene Laga Hoon.mp3" //19
	, "songs\\Lat-Lag-Gayi.mp3" //20
	, "songs\\Brown Rang.mp3" //21
	, "songs\\Chaar Botal Vodka.mp3" //22
	, "songs\\Party All Night.mp3" //23
	, "songs\\O Saki Saki.mp3" //24
	, "songs\\Dilbar.mp3" //25
	, "songs\\Akh Lad Jaave.mp3" //26
	, "songs\\Bom Diggy Diggy.mp3" //27
	, "songs\\Tu Hai.mp3" //28
	, "songs\\Believer.mp3" //29
	, "songs\\Hookah Bar.mp3" //30  			 		//end of songs for sad mood
	, "songs\\haareya.mp3" //1   					//start of songs for neutral mood
	, "songs\\ik vari aa.mp3" //2
	, "songs\\main tera.mp3"//3
	, "songs\\musafir.mp3" //4
	, "songs\\o sathi.mp3"//5
	, "songs\\O Mahi O Mahi.mp3"//6
	, "songs\\Tu Hai Kahan.mp3" //7
	, "songs\\phir bhi.mp3" //8
	, "songs\\Galliyan.mp3" //9
	, "songs\\Banjaara.mp3" //10
	, "songs\\Bekhayali.mp3" //11
	, "songs\\ban ja rani.mp3" //12
	, "songs\\barish.mp3" //13
	, "songs\\Banduk meri laila.mp3" //14
	, "songs\\Zihaal e Miskin.mp3" //15
	, "songs\\Sanam Aa Gaya.mp3" //16
	, "songs\\Downers-At-Dusk.mp3" //17
	, "songs\\No-Lie.mp3" //18
	, "songs\\Dil-Sambhal-Ja-Zara.mp3" //19
	, "songs\\Main Agar Kahoon.mp3" //20
	, "songs\\Zaroori Tha.mp3" //21
	, "songs\\Tum Hi Ho.mp3" //22
	, "songs\\Lovely.mp3" //23
	, "songs\\Tu Hi Haqeeqat.mp3" //24
	, "songs\\Do Pal Ruka.mp3" //25
	, "songs\\Tum Hi Aana.mp3" //26
	, "songs\\Besharam Rang.mp3" //27
	, "songs\\Tumhe-Dillagi-Ha-Jani-Padegi.mp3" //28
	, "songs\\Wajah Tum Ho.mp3" //29
	, "songs\\Dil Mein Chhupa Loonga.mp3" //30				//end of songs for neutral mood
];

//angry //Happy //sad  //neutral
//song names
var sname = [
	"BoDleasons",	//1
	"reverie-scott-buckley",	//2
	"Moonset",//3
	"Moon-Dock",//4
	"Out_There",//5
	"Inspiring",//6
	"Forest-of-dreams",//7
	"glow",//8
	"wanderlust",//9
	"Grass",//10
	"Morning-in-the-forest",//11
	"Dreams-in-nature",//12
	"Old-oak",//13
	"Lights",//14
	"Sakura-Girl-After-All",//15
	"Sakura-Girl-Morning-Coffee",//16
	"roa",//17
	"Follow-The-Sun",//18
	"summer-madness",//19
	"Colorful-Flowers",//20
	"Inspire.mp3" //21
	, "Jaipur.mp3" //22
	, "Humsafar.mp3" //23
	, "borrow-the-happiness.mp3" //24
	, "Safar.mp3" //25
	, "marathon.mp3" //26
	, "ray-of-hope.mp3" //27
	, "reality.mp3" //28
	, "Autumn-Scene.mp3" //29
	, "keys-of-moon-white-petals.mp3" //30     						//end of songs for angry mood
	, "Tum Jo Aaye.mp3" //1      				//start of songs for happy mood
	, "Maan Meri Jaan.mp3" //2
	, "Badtameez Dil.mp3" //3
	, "Therapy.mp3" //4
	, "Lagdi Lahore Di.mp3" //5
	, "Smack-That.mp3" //6
	, "Kuch-Is-Tarah.mp3" //7
	, "Happy Hour.mp3" //8
	, "Tumhari Mast Aankhon Ne.mp3" //9
	, "Lut Gaye.mp3" //10
	, "Thoda Thoda Pyar.mp3" //11
	, "Halki Si Barsaat.mp3" //12
	, "Tum Mile.mp3" //13
	, "Gerua.mp3" //14
	, "Khamoshiyan.mp3" //15
	, "Aye Khuda Gir Gaya.mp3" //16
	, "Sun Sun Barsat Ki Dhun.mp3" //17
	, "Sab Tera.mp3" //18
	, "Phir Aur Kya Chahiye.mp3" //19
	, "Ek Toh Kum Zindagani.mp3" //20
	, "Kinna Sona.mp3" //21
	, "Ra Ra Rakkamma.mp3" //22
	, "Mere Mehboob Qayamat Hogi.mp3" //23
	, "Ve Haniya.mp3" //24
	, "Machayenge.mp3" //25
	, "Firse Machayenge.mp3" //26
	, "Tera Yaar Hoon Main.mp3" //27
	, "Nashe Si Chadh Gayi.mp3" //28
	, "Lungi Dance.mp3" //29
	, "Bol-Na-Halke-Halke.mp3" //30      						//end of songs for happy mood
	, "Kabhi-Kabhi-Aditi-Zindagi.mp3" //1						//start of songs for sad mood
	, "Ajab Si.mp3" //2
	, "Love you zindagi.mp3" //3
	, "Deewangi Deewangi.mp3" //4
	, "Itni Si Hasi.mp3" //5
	, "Chaleya.mp3" //6
	, "I Guess.mp3" //7
	, "Pehle Bhi Main.mp3" //8
	, "Abhi Mujh Mein Kahin.mp3" //9
	, "Kun Faaya Kun.mp3" //10
	, "Urvashi Urvashi.mp3" //11
	, "Balam Pichkari.mp3" //12
	, "DJ Waley Babu.mp3" //13
	, "Levitating.mp3" //14
	, "Amplifier.mp3" //15
	, "K-Naan-Wavin-Flag.mp3" //16
	, "Teri Adaaon Se Dilkash Khatao.mp3" //17
	, "High Heels.mp3" //18
	, "Jeene Laga Hoon.mp3" //19
	, "Lat-Lag-Gayi.mp3" //20
	, "Brown Rang.mp3" //21
	, "Chaar Botal Vodka.mp3" //22
	, "Party All Night.mp3" //23
	, "O Saki Saki.mp3" //24
	, "Dilbar.mp3" //25
	, "Akh Lad Jaave.mp3" //26
	, "Bom Diggy Diggy.mp3" //27
	, "Tu Hai.mp3" //28
	, "Believer.mp3" //29
	, "Hookah Bar.mp3" //30  			 		//end of songs for sad mood
	, "haareya.mp3" //1   					//start of songs for neutral mood
	, "ik vari aa.mp3" //2
	, "main tera.mp3"//3
	, "musafir.mp3" //4
	, "o sathi.mp3"//5
	, "O Mahi O Mahi.mp3"//6
	, "Tu Hai Kahan.mp3" //7
	, "phir bhi.mp3" //8
	, "Galliyan.mp3" //9
	, "Banjaara.mp3" //10
	, "Bekhayali.mp3" //11
	, "ban ja rani.mp3" //12
	, "barish.mp3" //13
	, "Banduk meri laila.mp3" //14
	, "Zihaal e Miskin.mp3" //15
	, "Sanam Aa Gaya" //16
	, "Downers-At-Dusk" //17
	, "No-Lie" //18
	, "Dil-Sambhal-Ja-Zara" //19
	, "Main Agar Kahoon" //20
	, "Zaroori Tha" //21
	, "Tum Hi Ho" //22
	, "Lovely" //23
	, "Tu Hi Haqeeqat" //24
	, "Do Pal Ruka" //25
	, "Tum Hi Aana" //26
	, "Besharam Rang" //27
	, "Tumhe-Dillagi-Ha-Jani-Padegi" //28
	, "Wajah Tum Ho." //29
	, "Dil Mein Chhupa Loonga" //30

];

//angry //Happy //sad  //neutral
//Artist names
var sd = [
	//Angry
	"Artist: NA "   //1
	, "Artist: NA " //2
	, "Artist: NA "//3
	, "Artist: NA "//4
	, "Artist: NA "//5
	, "Artist: NA "//6
	, "Artist: NA "//7
	, "Artist: NA "//8
	, "Artist: NA "//9
	, "Artist: NA "//10
	, "Artist: NA "//11
	, "Artist: NA "//12
	, "Artist: NA "//13
	, "Artist: NA "//14
	, "Artist: NA "//15
	, "Artist: NA "//16
	, "Artist: NA "//17
	, "Artist: NA "//18
	, "Artist: NA "//19
	, "Artist: NA "//20
	, "Artist: NA "//21
	, "Artist: NA "//22
	, "Artist: NA "//23
	, "Artist: NA "//24
	, "Artist: NA "//25
	, "Artist: NA "//26
	, "Artist: NA "//27
	, "Artist: NA "//28
	, "Artist: NA "//29
	, "Artist: NA "//30
	//happy
	, "Artist - Rahat Fateh Ali Khan, Tulsi Kumar"
	, "Artist - Amit Trivedi, Kavita Seth"
	, "Artist - Benny Dayal, Shefali Alvares"
	, "Artist - Badshah"
	, "Artist - Guru Randhawa, Tulsi Kumar"
	, "Artist - Akon, Eminem"
	, "Artist - Atif Aslam"
	, "Artist - Mika Singh,"
	, "Artist - Hariharan, Sadhana Sargam"
	, "Artist - Jubin Nautiyal"
	, "Artist - Neha Kakkar, Stebin Ben"
	, "Artist - Shreya Ghoshal, Shaan"
	, "Artist - Neeraj Shridhar, Shafqat Amanat Ali"
	, "Artist - Arijit Singh, Antara Mitra"
	, "Artist - Arijit Singh"
	, "Artist - Rahat Fateh Ali Khan"
	, "Artist - Alka Yagnik, Kumar Sanu"
	, "Artist - Armaan Malik, Shraddha Kapoor"
	, "Artist - Sonu Nigam, Shreya Ghoshal"
	, "Artist - Neha Kakka,r, Yash Narvekar"
	, "Artist - Sunil Kamath"
	, "Artist - S.P. Balasubrahmanyam, K.S. Chithra"
	, "Artist - Kishore Kumar"
	, "Artist - Neha Kakka,r, Sonu Kakkar, Piyush Mehroliyaa"
	, "Artist - Emiway Bantai"
	, "Artist - Emiway Bantai"
	, "Artist - Arijit Singh"
	, "Artist - Arijit Singh"
	, "Artist - Yo Yo Honey Singh"
	, "Artist - Rahat Fateh Ali Khan, Mahalakshmi Iyer"
	//sad
	, "Artist - A.R. Rahman", 
	, "Artist - KK"
	, "Artist - Amit Trivedi, Jasleen Royal"
	, "Artist - Shankar Mahadevan, Shaan, Udit Narayan, Shreya Ghoshal, Sunidhi Chauhan"
	, "Artist - Pritam, KK"
	, "Artist - Pritam, Master Saleem"
	, "Artist - Khalid"
	, "Artist - Mohit Chauhan"
	, "Artist - Sonu Nigam"
	, "Artist - A.R. Rahman, Javed Ali, Mohit Chauhan"
	, "Artist - A.R. Rahman"
	, "Artist - Vishal Dadlani, Shalmali Kholgade"
	, "Artist - Badshah, Aastha Gill"
	, "Artist - Dua Lipa"
	, "Artist - Imran Khan"
	, "Artist - K_naan"
	, "Artist - Atif Aslam"
	, "Artist - Jaz Dhami, Yo Yo Honey Singh"
	, "Artist - Atif Aslam, Shreya Ghoshal"
	, "Artist - Benny Dayal, Shalmali Kholgade"
	, "Artist - Yoyo Honey Singh"
	, "Artist - Yo Yo Honey Singh, Sunny Leone"
	, "Artist - Yo Yo Honey Singh"
	, "Artist - Neha Kakkar, Tulsi Kumar, B Praak"
	, "Artist - Neha Kakkar, Dhvani Bhanushali, Ikka Singh"
	, "Artist - Badshah, Asees Kaur, Jubin Nautiyal"
	, "Artist - Zack Knight, Jasmin Walia"
	, "Artist - A.R. Rahman, Sanah Moidutty"
	, "Artist - Imagine Dragons"
	, "Artist - Himesh Reshammiya, Vineet Singh"
	//neutral	
	, "Artist - Arijit Singh"
	, "Artist - Arijit Singh"
	, "Artist - Arijit Singh"
	, "Artists - Atif Aslam, Palak Muchhal"
	, "Artist - Atif Aslam"
	, "Artists - Neha Kakkar, Bohemia"
	, "Artists - Suraj Jagan, Shweta Pandit"
	, "Artist - Vishal Mishra"
	, "Artist - Ankit Tiwari"
	, "Artist - Mohammad Irfan"
	, "Artist - Sachet Tandon"
	, "Artist - Guru Randhawa"
	, "Artists - Neha Kakkar, Bilal Saeed"
	, "Artists - Ash King, Jigar Saraiya, Raftaar, Siddharth Mahadevan"
	, "Artist - A.R. Rahman"
	, "Artists - Anand Raj Anand, Sunidhi Chauhan"
	, "Artist - Jon Fingas"
	, "Artists - Sean Paul, Dua Lipa"
	, "Artist - Arijit Singh"
	, "Artists - Sonu Nigam, Shreya Ghoshal"
	, "Artist - Rahat Fateh Ali Khan"
	, "Artist - Arijit Singh"
	, "Artists - Kanika Kapoor, Ravindra Upadhyay, Miraya Varma, Fateh Doe"
	, "Artists - Javed Ali, Shreya Ghoshal"
	, "Artists - Sonu Nigam, Lata Mangeshkar"
	, "Artist - Jubin Nautiyal"
	, "Artist - Abhijeet Sawant"
	, "Artists - Rahat Fateh Ali KhanWajah Tum Ho - Armaan Malik"
	, "Artists - Meet Bros, Armaan Malik, Tulsi Kumar"

];

var bool = [];
for (var i = 0; i < sd.length; i++)
	bool[i] = false;

//angry //Happy //sad  //neutral
var icon = [
	"images\\\\a1.jpg",      	//1				start angry song icons
	"images\\\\a2.jpg",			//2
	"images\\\\a3.jpg",			//3		
	"images\\\\a4.jpg",			//4
	"images\\\\a5.jpg",			//5
	"images\\\\a6.jpg",			//6
	"images\\\\a7.jpg",			//7
	"images\\\\a8.jpg",			//8
	"images\\\\a9.jpg",			//9
	"images\\\\a10.jpg",			//10
	"images\\\\a11.jpg",			//11
	"images\\\\a12.jpg",			//12
	"images\\\\a13.jpg",			//13
	"images\\\\a14.jpg",			//14
	"images\\\\a15.jpg",			//15
	"images\\\\a16.jpg",			//16
	"images\\\\a17.jpg",			//17
	"images\\\\a18.jpg",			//18
	"images\\\\a19.jpg",			//19
	"images\\\\a20.jpg",			//20
	"images\\\\a21.jpg",			//21
	"images\\\\a22.jpg",			//22
	"images\\\\a23.jpg",			//23
	"images\\\\a24.jpg",			//24
	"images\\\\a25.jpg",			//25
	"images\\\\a26.jpg",			//26
	"images\\\\a27.jpg",			//27
	"images\\\\a28.jpg",			//28
	"images\\\\a29.jpg",			//29
	"images\\\\a30.jpg",			//30      		end angry song icons
	"images\\\\h1.jpg",			//1				start happy songs icon
	"images\\\\h2.jpg",			//2
	"images\\\\h3.jpg",			//3
	"images\\\\h4.jpg",			//4
	"images\\\\h5.jpg",			//5
	"images\\\\h6.jpg",			//6
	"images\\\\h7.jpg",			//7
	"images\\\\h8.jpg",			//8
	"images\\\\h9.jpg",			//9
	"images\\\\h10.jpg",			//10
	"images\\\\h11.jpg",			//11
	"images\\\\h12.jpg",			//12
	"images\\\\h13.jpg",			//13
	"images\\\\h14.jpg",			//14
	"images\\\\h15.jpg",			//15
	"images\\\\h16.jpg",			//16
	"images\\\\h17.jpg",			//17
	"images\\\\h18.jpg",			//18
	"images\\\\h19.jpg",			//19
	"images\\\\h20.jpg",			//20
	"images\\\\h21.jpg",			//21
	"images\\\\h22.jpg",			//22
	"images\\\\h23.jpg",			//23
	"images\\\\h24.jpg",			//24
	"images\\\\h25.jpg",			//25
	"images\\\\h26.jpg",			//26
	"images\\\\h27.jpg",			//27
	"images\\\\h28.jpg",			//28
	"images\\\\h29.jpg",			//29
	"images\\\\h30.jpg",			//30			end happy songs icon
	"images\\\\s1.jpg",			//1				start of sad song icons
	"images\\\\s2.jpg",			//2
	"images\\\\s3.jpg",			//3
	"images\\\\s4.jpg",			//4
	"images\\\\s5.jpg",			//5
	"images\\\\s6.jpg",			//6
	"images\\\\s7.jpg",			//7
	"images\\\\s8.jpg",			//8
	"images\\\\s9.jpg",			//9
	"images\\\\s10.jpg",			//10
	"images\\\\s11.jpg",			//11
	"images\\\\s12.jpg",			//12
	"images\\\\s13.jpg",			//13
	"images\\\\s14.jpg",			//14
	"images\\\\s15.jpg",			//15
	"images\\\\s16.jpg",			//16
	"images\\\\s17.jpg",			//17
	"images\\\\s18.jpg",			//18
	"images\\\\s19.jpg",			//19
	"images\\\\s20.jpg",			//20
	"images\\\\s21.jpg",			//21
	"images\\\\s22.jpg",			//22
	"images\\\\s23.jpg",			//23
	"images\\\\s24.jpg",			//24
	"images\\\\s25.jpg",			//25
	"images\\\\s26.jpg",			//26
	"images\\\\s27.jpg",			//27
	"images\\\\s28.jpg",			//28
	"images\\\\s29.jpg",			//29
	"images\\\\s30.jpg",			//30			end of sad song icons
	"images\\\\n1.jpg",			//1				start of neutral song icons
	"images\\\\n2.jpg",			//2
	"images\\\\n3.jpg",			//3
	"images\\\\n4.jpg",			//4
	"images\\\\n5.jpg",			//5
	"images\\\\n6.jpg",			//6
	"images\\\\n7.jpg",			//7
	"images\\\\n8.jpg",			//8
	"images\\\\n9.jpg",			//9
	"images\\\\n10.jpg",			//10
	"images\\\\n11.jpg",			//11
	"images\\\\n12.jpg",			//12
	"images\\\\n13.jpg",			//13
	"images\\\\n14.jpg",			//14
	"images\\\\n15.jpg",			//15
	"images\\\\n16.jpg",			//16
	"images\\\\n17.jpg",			//17
	"images\\\\n18.jpg",			//18
	"images\\\\n19.jpg",			//19
	"images\\\\n20.jpg",			//20
	"images\\\\n21.jpg",			//21
	"images\\\\n22.jpg",			//22
	"images\\\\n23.jpg",			//23
	"images\\\\n24.jpg",			//24
	"images\\\\n25.jpg",			//25
	"images\\\\n26.jpg",			//26
	"images\\\\n27.jpg",			//27
	"images\\\\n28.jpg",			//28
	"images\\\\n29.jpg",			//29
	"images\\\\n30.jpg",			//30			end of neutral song icons



];

var mood = [
	[
		"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30" 		//angry
	],
	[
		"31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"		//happy	
	],
	[
		"61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"		//sad
	],
	[
		"91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120"			//neutral
	]
];
//angry //Happy //sad  //neutral
var mmm = [
	"1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "1.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png", "2.png"
	, "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "3.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png", "4.png"
];


var songs=new Array(icon.length);
for (var i = 0; i<icon.length; i++) {
	songs[i]=new Array(4);
	songs[i][0]=path[i];
	songs[i][1]=sd[i];
	songs[i][2]=icon[i];
	songs[i][3]=mmm[i];
	console.log(songs[i][0]);
	console.log(songs[i][1]);
	console.log(songs[i][2]);
	console.log(songs[i][3]);
	var ins=document.createElement("div");
	ins.id='b'+i;
	//ins.onclick=function(){
	//next(this);
  	//};
	ins.setAttribute("class", "song");
	document.body.appendChild(ins);
	document.getElementById('b'+i).innerHTML='<div id="pic" style=\'background-image: url(\"'+songs[i][2]+'\");\'>  <input type="button" id="'+"a"+i+'" class="play" > <input type="button" id="'+"c"+i+'" class="add">  </div><div id="data"><br><br>'+songs[i][1]+'</div>';
	// document.getElementById('a'+i).onclick=function(){
	// 	play(this);
	// };
	document.getElementById('a' + i).onclick = (function(index) {
        return function() {
            play(index);
        };
    })(i);
	document.getElementById('c'+i).onclick=function(){
		addq(this);
	};	

}

function setmod(mode) {
	 console.log("Mode:", mode);
    // console.log("Clicked Index:", clickedIndex);
    if (mode === 2) { // Switching to emotion mode
        mod = mode;
        isEmotionModePlaying = false; // Reset the flag
        currentEmotion = null; // Clear the current emotion
        songrun = false; // Reset song play state
		
        
        // Pause the audio player
        document.getElementById("main_slider").pause();
        
        
      // Start emotion detection if it's not already running
	  if (!isEmotionDetectionRunning) {
		startEmotionDetection();
		isEmotionDetectionRunning = true; // Set the flag to indicate that emotion detection is running
	}
        
} else if (mode === 1) { 
		mod = mode;	// Switching to queue mode
        isEmotionModePlaying = false; // Reset the flag
        currentEmotion = null; // Clear the current emotion
        songrun = false; // Reset song play state
		
        
        // Pause the audio player
        document.getElementById("main_slider").pause();

		 // Stop the audio playback
		 document.getElementById("main_slider").currentTime = 0
        
          // Stop emotion detection if it's running
		  if (isEmotionDetectionRunning) {
            stopEmotionDetection(); // Placeholder for stopping emotion detection
            isEmotionDetectionRunning = false; // Reset the flag
        }
		 // Reset lastEmotionModeIndex when switching to queue mode
			
		for (let i = 0; i < songs.length; i++) {
			document.getElementById(`b${i}`).style.display = 'block';
		}
		
    }
}



function moodTxt(emotion){
	if(emotion === "angry"){
		document.getElementById('moodtext').textContent = "MUSIC PLAYER : Angry Mood"
	}
	else if(emotion === "sad"){
		document.getElementById('moodtext').textContent = "MUSIC PLAYER : Sad Mood"
	}
	else if(emotion === "happy"){
		document.getElementById('moodtext').textContent = "MUSIC PLAYER : Happy Mood"
	}
	else if(emotion === "neutral"){
		document.getElementById('moodtext').textContent = "MUSIC PLAYER : Neutral Mood"
	}
	else{
			document.getElementById('moodtext').textContent = ""
		}
}



function playSongsSequentially(emotion, startIndex = null) {
	// if(mod===1){
	// 	document.getElementById("main_slider").pause();
	// 	console.log("mode 1 from playsong sequentially")
	// 	return
	// }
	moodTxt(emotion)
    isEmotionModePlaying = true; // Set the flag
    currentEmotion = emotion; // Update the current emotion
	
    const emotionInd = { "angry": 0, "happy": 30, "sad": 60, "neutral": 90 };
    let startInd = startIndex !== null ? startIndex : emotionInd[emotion];
    const endInd = emotionInd[emotion] + 29;
    // Get the main audio player element
    const audioPlayer = document.getElementById("main_slider");

    function playSong(index) {
        if (index >= startInd && index <= endInd && index < songs.length) {
            const song = songs[index];
            audioPlayer.src = song[0]; // Song path
			document.getElementById("sname").innerHTML = sname[index]; 
            document.getElementById("emoji").style.backgroundImage = "url('" + song[3] + "')"; // Emoji
            
            // Load and play the song
            audioPlayer.load();
            audioPlayer.play();

            // Set a timeout to play the next song after this one finishes
            audioPlayer.onended = function() {
                playNextSong(index + 1);
            };
        }
    }



    function playNextSong(index) {
        if (index <= endInd && index < songs.length) {
            // Delay before playing the next song
            setTimeout(() => {
                playSong(index);
            }, 1000); // Adjust the delay as needed (in milliseconds)
        }
    }

    // Start playing songs sequentially
    playSong(startInd);
}





eel.expose(playSongsSequentially)

// Function to start the emotion detection process
function startEmotionDetection() {
	console.log("Starting emotion detection...");
	// Reinitialize video capture when starting emotion detection
    // Call the Python function to capture frames and detect emotion
    eel.startEmotionDetection()();
	eel.getEmotion()
}

function stopEmotionDetection(){
	console.log("stopping emotion detection...and switching to queue mode");
	eel.stopEmotionDetection()();
}

function displaySongsBasedOnEmotion(emotion) {
    const emotionIndex = { "angry": 0, "happy": 30, "sad": 60, "neutral": 90 };
    const startIndex = emotionIndex[emotion];
    const endIndex = startIndex + 29;
	console.log(startIndex)
	console.log(endIndex)

    // Hide all song divs first
    for(let i = 0; i < 120; i++) {
        document.getElementById(`b${i}`).style.display = 'none';
    }

    // Display only the songs that match the emotion
    for(let i = startIndex; i < endIndex; i++) {
        document.getElementById(`b${i}`).style.display = 'block';
    }

}
eel.expose(displaySongsBasedOnEmotion);




// Update the play function to handle playing songs in different modes
function play(index) {
    // Pause the current playback
	console.log("play button clicked")
    
    // Check if we are switching from emotion mode to queue mode and a different song was clicked
    if (mod === 1) {
		document.getElementById("main_slider").pause();
		if (index >= 0 && index < songs.length) {
				console.log("play button of song at " + index +" got clicked")
				var z = songs[index][0];
				document.getElementById("sname").innerHTML = sname[index];
				document.getElementById("sel").src = z;
				// document.getElementById("main_slider").pause();+
				document.getElementById("main_slider").load();
				document.getElementById("main_slider").play();
				document.getElementById("emoji").style.backgroundImage = "url('" + songs[index][3] + "')";
				songrun = true;
				console.log(z)
			
		} else {
			console.log("Index out of bounds: ", index);
		}
		return; // Exit to avoid playing the same song again below
    }

    // Check if we are switching from queue mode to emotion mode
    if (mod === 2 && isEmotionModePlaying) {
		document.getElementById("main_slider").pause();
        playSongsSequentially(currentEmotion, index); // Start playing songs sequentially from the clicked song index in emotion mode
        return; // Exit to avoid playing the same song again below
    }
 
}

var eqc=1;
var sqc=1;

function addq(elem){
	console.log(elem.id);
	var x=elem.id.charAt(1);
	if(!songrun){
		var z=songs[x][0];
		document.getElementById("sname").innerHTML=sname[x];
		document.getElementById("sel").src= z;
		document.getElementById("main_slider").load();
		document.getElementById("main_slider").play();
		document.getElementById("emoji").style.backgroundImage="url('"+songs[x][3]+"')";
		songrun=true;		
		return;
	}
	if(bool[x]==true)
		return;
	
	bool[x]=true;
	var l=document.createElement("label");
	l.id="e"+eqc;
	l.name=x;
	l.innerHTML=sname[x]+"<br>";
	//var text=document.createTextNode(sname[x]+"<br>");
	//l.appendChild(text);
	document.getElementById("queue").appendChild(l);
	eqc=eqc+1;
}

function nextsong(){
	if(sqc==eqc){
				alert("Queue is empty.");
				return;
		}
		var elem=document.getElementById("e"+sqc);
			var xa=elem.name;
			var pa=songs[xa][0];
			bool[xa]=false;
			document.getElementById("sname").innerHTML=sname[xa];
			document.getElementById("sel").src= pa;
			document.getElementById("main_slider").load();
			document.getElementById("main_slider").play();
			document.getElementById("emoji").style.backgroundImage="url('"+songs[xa][3]+"')";
			
			songrun=true;
			document.getElementById("queue").removeChild(elem);	
			sqc=sqc+1;

}

function next_in_Q(){
			songrun=false;
			if(sqc==eqc){
				alert("Queue is empty.");
				return;
			}
			var elem=document.getElementById("e"+sqc);
			var xa=elem.name;
			var pa=songs[xa][0];
			document.getElementById("sname").innerHTML=sname[xa];
			document.getElementById("sel").src= pa;
			document.getElementById("main_slider").load();
			document.getElementById("main_slider").play();
			document.getElementById("emoji").style.backgroundImage="url('"+songs[xa][3]+"')";
			songrun=true;
			document.getElementById("queue").removeChild(elem);	
			sqc=sqc+1;
			}

function moody(val){
	var index=Math.random()*mood[val].length;
	index=parseInt(index);
	var pa=songs[mood[val][index]-1][0];
	document.getElementById("sname").innerHTML=sname[mood[val][index]-1];
	document.getElementById("sel").src= pa;
	document.getElementById("main_slider").load();
	document.getElementById("main_slider").play();
	document.getElementById("emoji").style.backgroundImage="url('"+songs[mood[val][index]-1][3]+"')";
	songrun=true;
}


