async function testAPI() {
  try {
    const res = await fetch('http://localhost:3000/api/catalog/products?limit=100');
    if (res.ok) {
      const data = await res.json();
      console.log('Total items:', data.items ? data.items.length : 0);
      if (data.items && data.items.length > 0) {
        console.log('Sample item:', JSON.stringify(data.items[0], null, 2));
      } else {
        console.log('No items returned from API.', data);
      }
    } else {
      console.log('API Error:', res.status, res.statusText);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
testAPI();
