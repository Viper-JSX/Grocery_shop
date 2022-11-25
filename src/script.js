//import Product from 'Classes.js';

//console.log(Product)
//let products = [];

let searchInput = document.querySelector("#searchInput");
let optionSearch = document.querySelector("#optionSearch");
let cardContainer = document.querySelector("#cardContainer");
let cards = [];
let cart = document.querySelector("#cart");
let showShop = document.querySelector("#showShop");
let showCart = document.querySelector("#showCart");
let cartTotalPrice = document.querySelector("#cartTotalPrice");

class Product{
	constructor(title, discription, category, pricePerOne, imageSrc){
		this.title = title;
		this.discription = discription;
		this.category = category;
		this.pricePerOne = pricePerOne;
		this.imageSrc = imageSrc;
	}

	addToCart(){

	};

	addFunctionality(){

	}

	createCard(){
		let card = document.createElement("div");
		card.innerHTML = `
				<img id="productPicture" src="${this.imageSrc}" alt="">
				<h3>${this.title}</h3>
				<p>${this.discription}</p>
				<div id="quantityControll">
					<button id="decreaseQuantiti">-</button>
					<input id="quantity" type="text" value="1">
					<button id="increaseQuantity">+</button>
				</div>
				<button id="addToCartButton">Add to cart</button>
				<br>
				<span id="totalPrice">${this.pricePerOne}</span>
				<span id="priceCurrency">&euro;</span>
		`
		card.setAttribute(this.category, "true")

		console.log(card)

		card.querySelector("#increaseQuantity").onclick = function(){ 
			card.querySelector("#quantity").value = parseInt(card.querySelector("#quantity").value) + 1;
			card.querySelector("#totalPrice").textContent = (parseInt(card.querySelector("#quantity").value) * this.pricePerOne).toFixed(2)//parseFloat(card.getAttribute("pricePerOne"))).toFixed(2); 
		}.bind(this);

		card.querySelector("#decreaseQuantiti").onclick = function(){
			if(parseInt(card.querySelector("#quantity").value) > 0){
				card.querySelector("#quantity").value = parseInt(card.querySelector("#quantity").value) - 1;
				card.querySelector("#totalPrice").textContent = (parseInt(card.querySelector("#quantity").value) * this.pricePerOne).toFixed(2);//parseFloat(card.getAttribute("pricePerOne"))).toFixed(2); 
			}
		}.bind(this);

		card.querySelector("#addToCartButton").onclick = function(){
			let productToCart = card.cloneNode(true);
			productToCart.querySelector("#addToCartButton").remove()
			cart.appendChild(productToCart);

			let productToCartAnimation = productToCart.cloneNode(true);
			document.body.appendChild(productToCartAnimation);
			productToCartAnimation.setAttribute("id", "productToCartAnimation");
			productToCartAnimation.style.cssText = `left: ${card.getBoundingClientRect().left}px; top: ${card.getBoundingClientRect().top}px;`;
			productToCartAnimation.style.cssText = `width: 20px; height: 40px; left: ${showCart.getBoundingClientRect().left}px; top: ${showCart.getBoundingClientRect().top}px;`;

			setTimeout(function(){
				document.body.removeChild(productToCartAnimation);
			}, 1000)

			productToCart.querySelector("#decreaseQuantiti").onclick = function(){
				if(parseInt(productToCart.querySelector("#quantity").value) > 0){
					productToCart.querySelector("#quantity").value = parseInt(productToCart.querySelector("#quantity").value) - 1;
					productToCart.querySelector("#totalPrice").textContent = (parseInt(productToCart.querySelector("#quantity").value) * this.pricePerOne).toFixed(2);//parseFloat(productToCart.getAttribute("pricePerOne"))).toFixed(2); 
					cartTotalPrice.textContent = (parseFloat(cartTotalPrice.textContent) - this.pricePerOne).toFixed(2);
				}
			}.bind(this);

			productToCart.querySelector("#increaseQuantity").onclick = function(){
				console.log((this));
				productToCart.querySelector("#quantity").value = parseInt(productToCart.querySelector("#quantity").value) + 1;
				productToCart.querySelector("#totalPrice").textContent = (parseInt(productToCart.querySelector("#quantity").value) * this.pricePerOne).toFixed(2); //parseFloat(productToCart.getAttribute("pricePerOne"))).toFixed(2); 
				cartTotalPrice.textContent = (parseFloat(cartTotalPrice.textContent) + this.pricePerOne).toFixed(2);
			}.bind(this);

			cartTotalPrice.textContent = (parseFloat(cartTotalPrice.textContent) + parseFloat(card.querySelector("#totalPrice").textContent)).toFixed(2);
		
			let productToCartDeleteButton = document.createElement("button");
			let productToCartDeleteDelayWindow = document.createElement("div");
			let productToCartCancelDelete = document.createElement("div");
			let productToCartDeleteDelayWindowCounter = document.createElement("p");
			let productToCartDeleteDelayWindowCount = 5;

			productToCartDeleteDelayWindow.append(productToCartDeleteDelayWindowCounter, productToCartCancelDelete);
			productToCartDeleteDelayWindow.style.cssText = "width: 100%; height: 100%; background: gray;";
			productToCartDeleteButton.setAttribute("id", "productToCartDeleteButton");
			productToCartDeleteButton.textContent = "X";
			productToCartCancelDelete.textContent = "Cancel";
		
			productToCartDeleteButton.onclick = function(){
				console.log("Click")
				productToCartDeleteButton.style.cssText = "pointer-events: none";
	
				productToCart.insertBefore(productToCartDeleteDelayWindow, productToCart.querySelector("img"));
				productToCart.style.overflow = "hidden";		
				productToCartDeleteDelayWindowCounter.textContent = productToCartDeleteDelayWindowCount--;

				let deletionCanceled = false;
				
				let deleteCountInterval = setInterval(function(){
					productToCartDeleteDelayWindowCounter.textContent = productToCartDeleteDelayWindowCount--;
				}, 1000)


				let deleteTimeout = setTimeout(function(){
					clearInterval(deleteCountInterval);
					
					productToCart.style.cssText = "width: 10px; height: 20px; min-width: 0px; min-height: 0px;";
						productToCart.removeChild(productToCartDeleteDelayWindow);
						setTimeout(function(){
							cart.removeChild(productToCart);
							cartTotalPrice.textContent = (parseFloat(cartTotalPrice.textContent) - parseFloat(productToCart.querySelector("#totalPrice").textContent)).toFixed(2);
					}, 1030)

				}, 5000)

				productToCartCancelDelete.onclick = function(){
					clearInterval(deleteCountInterval);
					clearTimeout(deleteTimeout);
					productToCart.removeChild(productToCartDeleteDelayWindow);
					productToCartDeleteButton.style.cssText = "pointer-events: all;";
					productToCartDeleteDelayWindowCount = 5;
				};

			}
			console.log(productToCart.querySelector("#productPicture"))

		productToCart.insertBefore(productToCartDeleteButton, productToCart.querySelector("img"));
		//productToCart.append(productToCartDeleteButton)
	}.bind(this);

		return card;
	}
}


let products = [
	new Product("Apple", "discription", "fruit", 20, ""),
	new Product("Apple", "discription", "fruit", 20, ""),
	new Product("Apple", "discription", "fruit", 20, ""),
];


const card = new Product("Apple", "discription", "fruit", 20, "");

//console.log(card.createCard())
//card.createCard()

//function createCard(card){
//	
//}

for(let i = 0; i < products.length; i++){
	let card = products[i].createCard();
	cardContainer.append(card);
	cards.push(card);
}



search:{
	let cardName;
	searchInput.addEventListener("keyup", function(){
		console.log("search")
		for(let i = 0; i < cards.length; i++){
			cardName = cards[i].querySelector("h3").textContent.toLowerCase();
			if(cardName.indexOf(searchInput.value) >= 0){				
				cards[i].style.display = "block";
			}
			else{
				cards[i].style.display = "none";
			}
		}
	})

	optionSearch.addEventListener("input", function(){
		if(optionSearch.value == "fruit"){
			for(card of cards){
				if(card.getAttribute("fruit")){
					card.style.display = "block";
				}
				else{
					card.style.display = "none";
				}
			}
		}
		else if(optionSearch.value == "vegetables"){
			for(card of cards){
				if(card.getAttribute("vegetable")){
					card.style.display = "block";
				}
				else{
					card.style.display = "none";
				}
			}
		}
		else if(optionSearch.value == "allProducts"){
			for(card of cards){
				card.style.display = "block";
			}
		}
	})
}



shiftingWinowModes:{
	showShop.onclick = function(){
		if(cardContainer.getAttribute("visible") == "false"){
			cardContainer.style.display = "flex";
			cardContainer.setAttribute("visible", "true");
			
			cart.style.display = "none";
			cart.setAttribute("visible", "false");
			
			showShop.style.cssText = "border: none; background: background: rgb(50, 50, 50);";
			showCart.style = "background: rgb(70, 70, 70); border: 1px solid black; border-top: none;";
		}
	}

	showCart.onclick = function(){
		if(cart.getAttribute("visible") == "false"){
			cart.style.display = "flex";
			cart.setAttribute("visible", "true");

			cardContainer.style.display = "none";
			cardContainer.setAttribute("visible", "false");

			showShop.style.cssText = "background: rgb(70, 70, 70); border: 1px solid black; border-top: none;";
			showCart.style.cssText = "border: none; background: rgb(50, 50, 50);";
		}
	}
}



addGroceryWindow:{
	let showAddGroceryWindowButton = document.querySelector("#showAddGroceryWindowButton");
	let addGroceryWindow = document.querySelector("#addGroceryWindow");
	let closeAddGroceryWindowButton = addGroceryWindow.querySelector("#closeAddGroceryWindowButton");
	let addGrorceryToShopButton = addGroceryWindow.querySelector("#addGroceryToShopButton");
	let groceryImageInput = addGroceryWindow.querySelector("#groceryImageInput");



	groceryImageInput.onchange = function(){
		let imagePreviewReader = new FileReader();

		imagePreviewReader.onload = function(){
			addGroceryWindow.querySelector("#groceryImagePreview").setAttribute("src", this.result);
		}

		imagePreviewReader.readAsDataURL(groceryImageInput.files[0]);
	}

	showAddGroceryWindowButton.onclick = function(){
		addGroceryWindow.style.display = "flex";
		showShop.onclick();
	}

	closeAddGroceryWindowButton.onclick = function(){
		addGroceryWindow.style.display = "none";
	}


	addGrorceryToShopButton.onclick = function(){
		let productTitle = addGroceryWindow.querySelector("#addGroceryTitleInput").value;
		let productDiscription = addGroceryWindow.querySelector("#addGroceryDescritpionInput").value;
		let productCategory = addGroceryWindow.querySelector("#addGroceryCategoryInput").value;
		let productPrice = parseInt(addGroceryWindow.querySelector("#addGroceryPriceInput").value);
		let productImage = groceryImageInput.files[0];

		let imagePreviewReader = new FileReader();
		imagePreviewReader.readAsDataURL(productImage);

		imagePreviewReader.onload = function(){
			addGroceryWindow.querySelector("#groceryImagePreview").setAttribute("src", this.result);
			if(true){//(productImage && productTitle && productPrice && productDescription){
				let reader = new FileReader();
				let product = new Product(productTitle, productDiscription, productCategory, productPrice, this.result);
				let card = product.createCard();

				products.push(product);
				cards.push(card);
				cardContainer.appendChild(card);
				closeAddGroceryWindowButton.onclick();
				cardContainer.scrollTo(0, card.offsetTop);
			}
		}
	}
}
