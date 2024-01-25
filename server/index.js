const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const dotdev = require('dotenv');
const bcrypt = require('bcryptjs');
const fileupload = require("express-fileupload");
const Student_Schima = require("./database/schima/student");
const Moneys_Schima = require("./database/schima/money");

dotdev.config({ path: './config.env' });
require("./database/connection");
const app = express();
app.use("/files", express.static("files"));
app.use(fileupload());
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
	destination: function (req, files, cb) {
	  cb(null, "./files");
	},
	filename: function (req, files, cb) {
	  const uniqueSuffix = Date.now();
	  cb(null, uniqueSuffix + files.originalname);
	},
  });
  
//   require("./database/schima/pdfDetails");
//   const PdfSchema = mongoose.model("PdfDetails");
  const upload = multer({ storage: storage });
  
  app.post("/upload-files", upload.single("file"), async (req, res) => {
	console.log(req.files);
	// const title = req.body.title;
	// const fileName = req.file.filename;
	// try {
	//   await PdfSchema.create({ title: title, pdf: fileName });
	//   res.send({ status: "ok" });
	// } catch (error) {
	//   res.json({ status: error });
	// }
  });





//getToken API ================================= getToken API
app.post("/getToken", async (req, res) => {
	try {
		const { token } = req.body;
		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
		if (isUsrToken) {
			res.json({ "message": true, "followings": isUsrToken.followings });
		}
	}
	catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});

//REGISTRATION API ================================= REGISTRATION API
app.post('/register', async (req, res) => {
	try {
		const { userImage, userName, userEmail, userPassword } = req.body;
		const userExist = await User_Schima.findOne({ userEmail: userEmail });
		if (userExist) {
			return res.status(422).json({ error: "User already exist" });
		} else {
			const user = new User_Schima({ userImage, userName, userEmail, userPassword });
			await user.save();
			return res.status(201).json({ message: "User register successful" });
		}
	} catch (err) {
		console.log(err);
	}
	return res.send(req.body);

});

//LOGIN API ================================= LOGIN API
app.post("/login", async (req, res) => {
	try {
		const { userEmail, userPassword } = req.body;

		const userLogin = await User_Schima.findOne({ userEmail: userEmail });

		if (userLogin) {
			const isPasordMatch = await bcrypt.compare(userPassword, userLogin.userPassword);

			if (isPasordMatch) {
				let auth_token = await userLogin.generateAuthToken();
				res.json({ "auth_token": auth_token });
			} else {
				res.status(400).json({ error: "Invalid Cradential" });
			}
		} else {
			res.status(400).json({ error: "Invalid Cradential" });
		}
	} catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
})



// //userDetails ================================= userDetails
// app.post('/userDetails', async (req, res) => {
// 	const { token } = req.body;
// 	const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 	res.send(isUsrToken);
// });



//ShopCreate API ================================= ShopCreate API
// app.post('/shopCreate', async (req, res) => {
// 	try {
// 		const { token, shopImage, shopName, shopType, shopAddress, place } = req.body;

// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			let userId = isUsrToken._id;
// 			const shop = new Shop_Schima({ userId, shopImage, shopName, shopType, shopAddress, place });
// 			const data = await shop.save();
// 			isUsrToken.shopID = isUsrToken.shopID = data._id.toString();
// 			await isUsrToken.save();
// 		}
// 		return res.status(201).json({ message: "Shop creation successful" });

// 	} catch (err) {
// 		console.log(err);
// 	}
// 	return res.send(req.body);

// });


//getUserImage API ================================= getUserImage API
// app.post("/getUserImage", async (req, res) => {
// 	try {
// 		const { token } = req.body;
// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			res.json({ "userImg": isUsrToken.userImage });
// 		}
// 	}
// 	catch (err) {
// 		console.log(err);
// 	}
// 	return res.send(req.body.data);
// });



//getShopID API ================================= getShopID API
// app.post("/getShopID", async (req, res) => {
// 	try {
// 		const { token } = req.body;
// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			res.send(isUsrToken.shopID);
// 		}
// 	}
// 	catch (err) {
// 		console.log(err);
// 	}
// 	return res.send(req.body.data);
// });


//ADD DATA ================================= ADD DATA
// app.post('/addData', async (req, res) => {
// 	const { token, productName, productImage, companyName, companyImage, sellType, catagory, productPrice, quantity, description, offer, deliveryCharge, rating } = req.body;
// 	try {
// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			const isShopId = await Shop_Schima.findOne({ _id: isUsrToken.shopID });
// 			if (isShopId) {
// 				const isShopProductListId = await ShopProductList_Schima.findOne({ _id: isShopId.shopProductListId });
// 				if (isShopProductListId) {

// 					const isCompanyName = await Company_Schima.findOne({ companyName: companyName });
// 					if (isCompanyName) {
// 						const ProductCollections = new Product_Schima({ productName, productImage, companyName, catagory, description, rating });
// 						const data = await ProductCollections.save();

// 						isCompanyName.productIds = isCompanyName.productIds.concat({ productId: data._id.toString() });
// 						await isCompanyName.save();

// 						let productList = [
// 							{
// 								productId: data._id.toString(),
// 								quantity: quantity,
// 								productPrice: productPrice,
// 								sellType: sellType,
// 								offer: offer,
// 								deliveryCharge: deliveryCharge
// 							}
// 						];
// 						isShopProductListId.productList = isShopProductListId.productList.concat(productList);
// 						await isShopProductListId.save();
// 					} else {
// 						const ProductCollections = new Product_Schima({ productName, productImage, companyName, catagory, description, rating });
// 						const data = await ProductCollections.save();
// 						let productIds = [
// 							{
// 								productId: data._id.toString()
// 							}
// 						]
// 						const ProductCompanyCollection = new Company_Schima({ companyName, companyImage, productIds });
// 						await ProductCompanyCollection.save();

// 						let productList = [
// 							{
// 								productId: data._id.toString(),
// 								quantity: quantity,
// 								productPrice: productPrice,
// 								sellType: sellType,
// 								offer: offer,
// 								deliveryCharge: deliveryCharge
// 							}
// 						];
// 						isShopProductListId.productList = isShopProductListId.productList.concat(productList);
// 						await isShopProductListId.save();
// 					}

// 				} else {
// 					const isCompanyName = await Company_Schima.findOne({ companyName: companyName });
// 					if (isCompanyName) {
// 						const ProductCollections = new Product_Schima({ productName, productImage, companyName, catagory, description, rating });
// 						const data = await ProductCollections.save();

// 						isCompanyName.productIds = isCompanyName.productIds.concat({ productId: data._id.toString() });
// 						await isCompanyName.save();
// 						let shopId = isShopId._id;
// 						let productList = [
// 							{
// 								productId: data._id.toString(),
// 								quantity: quantity,
// 								productPrice: productPrice,
// 								sellType: sellType,
// 								offer: offer,
// 								deliveryCharge: deliveryCharge
// 							}
// 						];
// 						const shopProductList = new ShopProductList_Schima({ shopId, productList });
// 						const getID = await shopProductList.save();

// 						isShopId.shopProductListId = getID._id.toString();
// 						await isShopId.save();
// 					} else {

// 						const ProductCollections = new Product_Schima({ productName, productImage, companyName, catagory, description, rating });
// 						const data = await ProductCollections.save();
// 						let productIds = [
// 							{
// 								productId: data._id.toString()
// 							}
// 						]
// 						const ProductCompanyCollection = new Company_Schima({ companyName, companyImage, productIds });
// 						await ProductCompanyCollection.save();
// 						let shopId = isShopId._id;
// 						let productList = [
// 							{
// 								productId: data._id.toString(),
// 								quantity: quantity,
// 								productPrice: productPrice,
// 								sellType: sellType,
// 								offer: offer,
// 								deliveryCharge: deliveryCharge
// 							}
// 						];
// 						const shopProductList = new ShopProductList_Schima({ shopId, productList });
// 						const getID = await shopProductList.save();

// 						isShopId.shopProductListId = getID._id.toString();
// 						await isShopId.save();
// 					}
// 				}
// 				return res.status(201).json({ error: "Uploaded" });
// 			}
// 		}
// 	} catch (err) {
// 		console.log(err)
// 	}
// 	return res.send(req.body);
// });

//getProducts ================================= getProducts
// app.post('/getProducts', async (req, res) => {
// 	const { token } = req.body;
// 	const arr = [];
// 	const IdArr = [];
// 	try {
// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			for (let r of isUsrToken.followings) {
// 				const userFollowings = await Shop_Schima.findOne({ "_id": r.followingID });
// 				if (userFollowings) {
// 					const productLists = await ShopProductList_Schima.findOne({ "_id": userFollowings.shopProductListId });
// 					if (productLists) {
// 						for (let r of productLists.productList) {
// 							let id = r.productId;
// 							let found = searchLogo(id);
// 							if (!found) {
// 								IdArr.push(id);
// 								const isProduct = await Product_Schima.findOne({ "_id": id });
// 								arr.push(isProduct);
// 							}

// 							function searchLogo(id) {
// 								let found = false;
// 								for (let i of IdArr) {
// 									if (i == id) {
// 										found = true;
// 										break;
// 									}
// 								}
// 								return found;
// 							}
// 						}
// 					}

// 				}
// 			}
// 			res.send(arr);
// 		}
// 	} catch (err) {
// 		console.log(err)
// 	}
// });


//getCompany ================================= getCompany
// app.get('/getCompany', async (req, res) => {
// 	let result = await Company_Schima.find();
// 	if (result.length > 0) {
// 		res.send(result);
// 	} else {
// 		res.send({ reslt: "No product found" });
// 	}
// });


//getShopProducts ================================= getShopProducts
// app.get('/getShopProducts/:shopProductListId', async (req, res) => {
// 	const arr = [];

// 	const isShopProductListId = await ShopProductList_Schima.findOne({ _id: req.params.shopProductListId });
// 	if (isShopProductListId) {
// 		for (let r of isShopProductListId.productList) {
// 			const products = await Product_Schima.findOne({ _id: r.productId });
// 			arr.push(
// 				{
// 					"products": products,
// 					"details": r
// 				}
// 			)
// 		}
// 		res.send(arr);
// 	}
// });


//buySingleProducts ================================= buySingleProducts
// app.post('/buySingleProducts', async (req, res) => {
// 	const { token, productId, productListObjectId, quantity, productPrice, sellType, offer, deliveryCharge } = req.body;
// 	try {
// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			const isShopId = await Shop_Schima.findOne({ _id: isUsrToken.shopID });
// 			if (isShopId) {
// 				const isShopProductListId = await ShopProductList_Schima.findOne({ _id: isShopId.shopProductListId });
// 				if (isShopProductListId) {
// 					let productList = [
// 						{
// 							productId: productId,
// 							quantity: quantity,
// 							productPrice: productPrice,
// 							sellType: sellType,
// 							offer: offer,
// 							deliveryCharge: deliveryCharge
// 						}
// 					];
// 					isShopProductListId.productList = isShopProductListId.productList.concat(productList);
// 					await isShopProductListId.save();

// 					const isproductListObjectId = await ShopProductList_Schima.findOne({ "productList._id": productListObjectId });
// 					if (isproductListObjectId) {
// 						for (let r of isproductListObjectId.productList) {
// 							if (r._id == productListObjectId) {
// 								r.quantity = r.quantity - quantity;
// 								await isproductListObjectId.save();
// 								break;
// 							}
// 						}
// 					}

// 				} else {
// 					let productList = [
// 						{
// 							productId: productId,
// 							quantity: quantity,
// 							productPrice: productPrice,
// 							sellType: sellType,
// 							offer: offer,
// 							deliveryCharge: deliveryCharge
// 						}
// 					];
// 					const shopProductList = new ShopProductList_Schima({ productList });
// 					const data = await shopProductList.save();

// 					isShopId.shopProductListId = data._id.toString();
// 					await isShopId.save();

// 					const isproductListObjectId = await ShopProductList_Schima.findOne({ "productList._id": productListObjectId });
// 					if (isproductListObjectId) {
// 						for (let r of isproductListObjectId.productList) {
// 							if (r._id == productListObjectId) {
// 								r.quantity = r.quantity - quantity;
// 								await isproductListObjectId.save();
// 								break;
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// 	catch (err) {
// 		console.log(err);
// 	}
// 	return res.send(req.body.data);
// });






//buyChartProdcts ================================= buyChartProdcts
// app.post('/buyChartProdcts', async (req, res) => {
// 	const { token, buyChartProdctsData } = req.body;

// 	try {
// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			const isShopId = await Shop_Schima.findOne({ _id: isUsrToken.shopID });
// 			if (isShopId) {
// 				const isShopProductListId = await ShopProductList_Schima.findOne({ _id: isShopId.shopProductListId });
// 				if (isShopProductListId) {
// 					isShopProductListId.productList = isShopProductListId.productList.concat(buyChartProdctsData);
// 					await isShopProductListId.save();
// 				} else {
// 					const shopProductList = new ShopProductList_Schima({ productList: buyChartProdctsData });
// 					const data = await shopProductList.save();

// 					isShopId.shopProductListId = data._id.toString();
// 					await isShopId.save();
// 				}
// 			}
// 		}
// 	}
// 	catch (err) {
// 		console.log(err);
// 	}
// 	return res.send(req.body.data);
// });


//getShopByPlace ================================= getShopByPlace
// app.post('/getShopByPlace', async (req, res) => {
// 	const { token, place } = req.body;
// 	const arr = [];
// 	const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 	let result = await Shop_Schima.find({ "place": place });
// 	if (isUsrToken.followings.length === 0) {
// 		res.send(result);
// 	} else {
// 		for (let i in result) {
// 			let id = result[i]._id;

// 			let found = searchLogo(id);
// 			if (!found) {
// 				arr.push(result[i])
// 			}
// 		}

// 		function searchLogo(id) {
// 			let found = false;
// 			for (let j in isUsrToken.followings) {
// 				if (isUsrToken.followings[j].followingID == id) {
// 					found = true;
// 					break;
// 				}
// 			}
// 			return found;
// 		}
// 		res.send(arr);
// 	}
// });




//followingList ================================= followingList
// app.post("/followingList", async (req, res) => {
// 	const { token } = req.body;
// 	const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 	if (isUsrToken) {
// 		res.send(isUsrToken.followings);
// 	}
// });

//follow ================================= follow
// app.post('/follow', async (req, res) => {
// 	const { token, shopId, shopName, shopImage, shopCatagory } = req.body;

// 	try {
// 		const isUsrToken = await User_Schima.findOne({ "tokens.token": token });
// 		if (isUsrToken) {
// 			let followings = [
// 				{
// 					followingID: shopId,
// 					followingName: shopName,
// 					followingImage: shopImage,
// 					followingCatagory: shopCatagory
// 				}
// 			]
// 			isUsrToken.followings = isUsrToken.followings.concat(followings);
// 			await isUsrToken.save();

// 			const isShop = await Shop_Schima.findOne({ _id: shopId });
// 			if (isUsrToken.shopID === undefined) {
// 				let followers = [
// 					{
// 						followingID: isUsrToken._id,
// 						followingName: isUsrToken.userName,
// 						followingImage: isUsrToken.userImage,
// 						followingCatagory: "Customer"
// 					}
// 				]
// 				isShop.followers = isShop.followers.concat(followers);
// 				await isUsrToken.save();
// 			} else {
// 				let followers = [
// 					{
// 						followingID: isUsrToken._id,
// 						followingName: isUsrToken.userName,
// 						followingImage: isUsrToken.userImage,
// 						followingCatagory: "Shop Owner"
// 					}
// 				]
// 				isShop.followers = isShop.followers.concat(followers);
// 				await isUsrToken.save();
// 			}
// 		}
// 	}
// 	catch (err) {
// 		console.log(err);
// 	}
// 	return res.send(req.body.data);
// });






// app.post("/getShopListByProduct", async (req, res) => {
// 	const { productId } = req.body;
// 	const arr = [];
// 	const result = await ShopProductList_Schima.find({ "productList.productId": productId });

// 	for (let r of result) {
// 		for (let pl of r.productList) {
// 			if (pl.productId === productId) {
// 				arr.push(pl)
// 				console.log(pl);
// 			}
// 		}
// 	}
// 	res.send(arr);
// });

// app.get("/getShopData/:shopID", async (req, res) => {
// 	let result = await Shop_Schima.find({ _id: req.params.shopID });
// 	res.send(result[0]);
// });

// app.get("/SPCodeData/:catagory", async (req, res) => {
// 	let result = await Product_Schima.find({ catagory: req.params.catagory });
// 	res.send(result);
// });


// app.get("/CPData/:companyName", async (req, res) => {
// 	let result = await Product_Schima.find({ companyName: req.params.companyName });
// 	res.send(result);
// });


//SEARCH ================================= SEARCH
// app.get('/search/:key', async (req, res) => {
// 	let result = await Product_Schima.find({
// 		"$or": [
// 			{ productName: { $regex: req.params.key } }
// 		]
// 	});
// 	res.send(result);
// });




const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log("Server Start");
});
