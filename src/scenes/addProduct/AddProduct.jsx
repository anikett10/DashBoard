import { useState } from "react";
import { Box, TextField, Button, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddProduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    // Handle form submission logic
  };

  return (
    <Box m="20px">
      <Header title="ADD PRODUCT" subtitle="Add a New Product" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={productSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name of Product"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productName}
                name="productName"
                error={!!touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                multiline
                rows={4}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                display="flex"
                flexWrap="wrap"
                gap="10px"
                mt="10px"
                sx={{ gridColumn: "span 4" }}
              >
                {values.imagePreviews && values.imagePreviews.map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={img}
                    alt={`preview ${index}`}
                    sx={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: `2px solid ${colors.primary[500]}`
                    }}
                  />
                ))}
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ gridColumn: "span 4" }}
              >
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setFieldValue("images", Array.from(e.target.files));
                    setFieldValue("imagePreviews", Array.from(e.target.files).map(file => URL.createObjectURL(file)));
                  }}
                  accept="image/*"
                  id="image-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    sx={{
                      borderRadius: "8px",
                      padding: "10px 20px",
                      textTransform: "none",
                      fontSize: "16px",
                      boxShadow: `0 4px 8px ${colors.primary[400]}`,
                      transition: "background-color 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        backgroundColor: colors.primary[300],
                        boxShadow: `0 6px 12px ${colors.primary[400]}`,
                      },
                    }}
                  >
                    Upload Images
                  </Button>
                </label>
                <Typography mt="10px" color={colors.grey[400]}>
                  Drag & drop or click to select files
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const productSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  images: yup.array().required("At least one image is required"),
});

const initialValues = {
  productName: "",
  description: "",
  price: "",
  images: [],
  imagePreviews: []
};

export default AddProduct;
