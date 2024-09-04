import { useState } from "react";
import { Box, IconButton, Typography, useTheme, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../theme";

const initialProducts = [
  { name: "Product 1", images: ["./assets/p1.jpeg"], quantity: 10, price: 20, description: "" },
  { name: "Product 2", images: ["./assets/p4.jpeg"], quantity: 5, price: 15, description: "" },
  { name: "Product 3", images: ["./assets/p5.jpeg"], quantity: 8, price: 25, description: "" },
  { name: "Product 4", images: ["./assets/p6.jpeg"], quantity: 2, price: 30, description: "" },
  { name: "Product 5", images: ["./assets/p7.jpeg"], quantity: 1, price: 10, description: "" },
];

const ProductList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState(initialProducts);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    images: [""],
    description: "",
    price: ""
  });

  const handleIncrease = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);

    setSnackbarMessage(`Increased quantity of ${updatedProducts[index].name} to ${updatedProducts[index].quantity}.`);
    setOpenSnackbar(true);

    if (updatedProducts[index].quantity === 3) {
      setSnackbarMessage(`Warning: ${updatedProducts[index].name} is running low. Only ${updatedProducts[index].quantity} left.`);
      setOpenSnackbar(true);
    }
  };

  const handleDecrease = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);

      setSnackbarMessage(`Decreased quantity of ${updatedProducts[index].name} to ${updatedProducts[index].quantity}.`);
      setOpenSnackbar(true);

      if (updatedProducts[index].quantity < 3) {
        setSnackbarMessage(`Warning: ${updatedProducts[index].name} is running low. Only ${updatedProducts[index].quantity} left.`);
        setOpenSnackbar(true);
      }
    }
  };

  const handleOpenEditDialog = (index) => {
    setCurrentProductIndex(index);
    setEditProduct(products[index]);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleAddImage = () => {
    setEditProduct({
      ...editProduct,
      images: [...editProduct.images, ""]
    });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...editProduct.images];
    updatedImages[index] = value;
    setEditProduct({ ...editProduct, images: updatedImages });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = editProduct.images.filter((_, i) => i !== index);
    setEditProduct({ ...editProduct, images: updatedImages });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...editProduct.images];
        updatedImages[index] = reader.result;
        setEditProduct({ ...editProduct, images: updatedImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = () => {
    const updatedProducts = [...products];
    updatedProducts[currentProductIndex] = {
      ...updatedProducts[currentProductIndex],
      ...editProduct
    };
    setProducts(updatedProducts);
    handleCloseEditDialog();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box m="20px">
      <Header title="Available Products" subtitle="List of Products" />

      {products.map((product, index) => (
        <Accordion key={index} defaultExpanded sx={{ mb: "20px", boxShadow: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="bold">
              {product.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" alignItems="center" sx={{ p: "10px", borderRadius: "8px", boxShadow: 1 }}>
              <Box display="flex" flexDirection="row" sx={{ mr: "20px" }}>
                {product.images.map((image, imgIndex) => (
                  <Box
                    key={imgIndex}
                    component="img"
                    src={image}
                    alt={product.name}
                    sx={{
                      width: "250px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      mr: "10px",
                    }}
                  />
                ))}
              </Box>
              <Box flex={1}>
                <Typography variant="body1" mb="10px">
                  {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                </Typography>
                <Typography variant="h6" mb="10px">
                  Price: ${product.price}
                </Typography>
                <Box display="flex" alignItems="center" mb="10px">
                  <IconButton onClick={() => handleDecrease(index)} sx={{ color: colors.redAccent[400] }}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography variant="h6" mx="10px" fontWeight="bold">
                    {product.quantity}
                  </Typography>
                  <IconButton onClick={() => handleIncrease(index)} sx={{ color: colors.greenAccent[400] }}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenEditDialog(index)} sx={{ ml: "10px" }}>
                    <EditIcon />
                  </IconButton>
                </Box>
                {product.quantity < 3 && (
                  <Typography variant="body2" color={colors.redAccent[400]} fontWeight="bold">
                    Warning: Low stock! Only {product.quantity} left.
                  </Typography>
                )}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            fullWidth
            variant="outlined"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
          <Typography variant="h6" mt="10px">
            Images
          </Typography>
          {editProduct.images.map((image, index) => (
            <Box key={index} display="flex" alignItems="center" mb="10px">
              <TextField
                margin="dense"
                label={`Image URL ${index + 1}`}
                fullWidth
                variant="outlined"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                style={{ marginLeft: 10 }}
                onChange={(e) => handleImageUpload(e, index)}
              />
              <IconButton onClick={() => handleRemoveImage(index)} sx={{ color: colors.redAccent[400], ml: "10px" }}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAddImage} sx={{ mb: "10px" }}>
            Add Image
          </Button>
          <TextField
            margin="dense"
            label="Product Description"
            fullWidth
            variant="outlined"
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Product Price"
            fullWidth
            variant="outlined"
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
