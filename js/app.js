import { initStorage } from "./storage.js";
import {
  getAllProducts,
  createProduct,
  editProduct,
  removeProduct,
  getStats,
  sortProducts,
} from "./products.js";
import {
  renderCards,
  renderStats,
  openModal,
  closeModal,
  fillEditForm,
  bindEvents,
} from "./ui.js";

//ÉTAT GLOBAL
let currentProductId = null;
let currentFilter = "all";
let currentSearch = "";
let currentSort = "default";

//REFRESH
function refresh() {
  let products = getAllProducts();

  if (currentFilter !== "all") {
    products = products.filter((p) => p.category === currentFilter);
  }

  if (currentSearch.trim() !== "") {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(currentSearch.toLowerCase()),
    );
  }

  if (currentSort !== "default") {
    const [by, order] = currentSort.split("-");
    products = sortProducts(products, by, order);
  }

  renderCards(products);
  renderStats(getStats());
}

//INIT 
function init() {
  initStorage();

  bindEvents({
    onAdd(data) {
      createProduct(data);
      closeModal("modal-add");
      refresh();
    },

    onEdit(id) {
      const product = getAllProducts().find((p) => p.id === id);
      currentProductId = id;
      fillEditForm(product);
      openModal("modal-edit");
    },

    onSaveEdit(data) {
      const updatedProduct = { ...data, id: currentProductId };
      editProduct(updatedProduct);
      closeModal("modal-edit");
      currentProductId = null;
      refresh();
    },

    onDelete(id) {
      currentProductId = id;
      openModal("modal-delete");
    },

    onConfirmDelete() {
      removeProduct(currentProductId);
      closeModal("modal-delete");
      currentProductId = null;
      refresh();
    },

    onSearch(value) {
      currentSearch = value;
      refresh();
    },

    onFilter(category) {
      currentFilter = category;
      refresh();
    },

    onSort(sortType) {
      currentSort = sortType;
      refresh();
    },
  });

  refresh();
}

init();
