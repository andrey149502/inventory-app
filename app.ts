class Product {
	constructor(
		public sku: string,
		public name: string,
		public imageUrl: string,
		public department: string[],
		public price: number) {
	}
}

@Component({
	selector: 'inventory-app',
	template: `
		<div class="inventory-app">
			<h1>{{ product.name }}</h1>
			<span>{{ product.sku }}</span>
			<product-list
				[productList]="products"
				(onProductSelected)="productWasSelected($event)">
			</product-list>
		</div>
	`
})
class InventoryApp {
	products: Product[];

	constructor() {
		this.products = [
			new Product(
				'MYSHOES',
				'Black Running Shoes',
				'/resources/images/products/black-shoes.jpg',
				['Men', 'Shoes', 'Running Shoes'],
				109.99),
			new Product(
				'NEATOJACKET',
				'Blue Jacket',
				'/resources/images/products/blue-jacket.jpg',
				['Women', 'Apparel', 'Jackets & Vests'],
				238.99),
			new Product(
				'NICEHAT',
				'A Nice Black Hat',
				'/resources/images/products/black-hat.jpg',
				['Men', 'Accessories', 'Hats'],
				29.99)
		];
	}

	productWasSelected(product: Product): void {
		console.log('Product clicked: ', product);
	}
}

@Component({
	selector: 'product-list',
	inputs: ['productList'],
	outputs: ['onProductSelected'],
	template: `
		<div class="ui items">
			<product-row
				*ngFor="let myProduct of productList"
				[product]="myProduct"
				(click)='clicked(myProduct)'
				[class.selected]="isSelected(myProduct)">
			</product-row>
		</div>	
	`
})
class ProductList {
	productList: Product[];
	onProductSelected: EventEmitter<Product>;
	currentProduct: Product;
	
	constructor() {
		this.onProductSelected = new EventEmmitter();
	}
}