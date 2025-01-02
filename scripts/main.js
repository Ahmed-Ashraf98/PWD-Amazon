//================= [APIs] ==========================

const baseUrl = `https://ecommerce.routemisr.com`;

const Categories_URL = `${baseUrl}/api/v1/categories`;

const ProductsByCatID = `${baseUrl}/api/v1/products?category=`;

// =================== [API Settings] ===========================

const api_token = "228e12081dmshf28115fb9df7ac2p189652jsn154d42a77d09";
const headers = {
  "x-rapidapi-key": api_token,
  "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
};

const options = {
  method: "GET",
  headers: headers,
};

function getAllCategories() {
  return new Promise(function (resolve, reject) {
    fetch(Categories_URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getAllProductsByCategoryID(categoryId) {
  return new Promise(function (resolve, reject) {
    fetch(ProductsByCatID + categoryId, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function displayCategories() {
  try {
    // Fetch all categories
    const res = await getAllCategories();
    createCategoryCard(res.data);
    console.log("All Categories:", res.data);

    // Fetch products by the first category ID
    if (res.data && res.data.length > 0) {
      const categoryID = res.data[1]._id; // Assuming `id` exists in category data
      const products = await getAllProductsByCategoryID(categoryID);
      console.log(`Products in Category ${categoryID}:`, products);
    } else {
      console.log("No categories available.");
    }

    // Log additional information if required
    if (res.data && res.data.length > 1) {
      console.log("Second Category:", res.data[1]);
    } else {
      console.log("Only one category found.");
    }

    console.log("RES Complete");
  } catch (error) {
    console.error("Error in displayCategories:", error);
  }
}

displayCategories();

function createCategoryCard(categoryList) {
  let card = "";
  for (let i = 0; i < categoryList.length; i++) {
    card += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card h-100 shadow-sm">
      <img
        src="${categoryList[i].image}"
        class="card-img-top"
        alt="${categoryList[i].name}"
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${categoryList[i].name}</h5>
        <p class="card-text">
          Find the latest and greatest in ${categoryList[i].name}.
        </p>
        <a href="#" class="btn btn-primary mt-auto">See Products</a>
      </div>
    </div>
  </div>`;
  }

  document.getElementById("categoriesList").innerHTML = card;
}
