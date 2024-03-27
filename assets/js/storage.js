class Book {
	constructor(id, img, title, volume, price, quantity) {
		this.id = id;
		this.img = img;
		this.title = title;
		this.volume = volume;
		this.price = price;
		this.quantity = quantity;
	}
}

const storage = [
	new Book(0, 'https://mangadex.org/covers/30f3ac69-21b6-45ad-a110-d011b7aaadaa/0dddf687-95ec-4e88-acd7-cd90a4c9749a.jpg', 'Tonikaku Kawaii', 18, 160000, 2),
	new Book(1, 'https://mangadex.org/covers/188e4f34-a80c-4a91-b54e-69572e8ed4d5/43f01b64-35f1-4938-afa5-4767f6401294.jpg', 'Saint Cecilia and Pastor Lawrence', 23, 160000, 2)
]

if(document.querySelector('.show')) {
	const show = document.querySelector('.show');

	storage.forEach(e => {
		var status;
		if(e.quantity != 0)
			status = 'Green';
		else
			status = 'Red';
		
		const book = `
			<div class="book bg-white border col p-2 d-flex flex-column flex-grow-0 justify-content-center gap-2 position-relative rounded">
				<div class="cover text-center"><img src="${e.img}"></div>
				<div class="title border-top" title="${e.title}">${e.title}</div>
				<div class="price">${e.price}</div>
				<span class="status${status} mt-1 p-1 position-absolute top-0 rounded"></span>
			</div>
		`;

		show.innerHTML += book;
	});
}

if(document.querySelector('.display')) {
	const display = document.querySelector('.display');

	storage.forEach(e => {
		const tDRow = `
			<tr class="text-center">
				<td>${e.id}</td>
				<td class="cover text-center"><img src="${e.img}"></td>
				<td class="text-start">${e.title}</td>
				<td>${e.volume}</td>
				<td class="text-end">${e.price}đ</td>
				<td>${e.quantity}</td>
				<td></td>
			</tr>
		`;

		display.innerHTML += tDRow;
	});
}