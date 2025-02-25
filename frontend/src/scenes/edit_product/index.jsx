import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../services/api"; // Import API functions
import Header from "../../components/Header";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const EditProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(id);
        console.log(response);
        // Ensure productData is properly structured and avoid undefined values
        setProductData({
          ...response,
          discount_type: response?.discount_type || "", // Default to empty string if undefined
          tax_type: response?.tax_type || "",
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!productData) return <p>Loading...</p>;

  const handleFormSubmit = async (values) => {
    try {
      await updateProduct(id, values); // Update product API call
      alert("Product updated successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      alert("Failed to update product. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Edit Product" subtitle="Update Product in Inventory" />

      <Formik
        enableReinitialize
        initialValues={productData || initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                label="Item name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.item_name}
                name="item_name"
                error={!!touched.item_name && !!errors.item_name}
                helperText={touched.item_name && errors.item_name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category_name}
                name="category_name"
                error={!!touched.category_name && !!errors.category_name}
                helperText={touched.category_name && errors.category_name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="SKU"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sku}
                name="sku"
                error={!!touched.SKU && !!errors.SKU}
                helperText={touched.SKU && errors.SKU}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="HSN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hsn}
                name="hsn"
                error={!!touched.HSN && !!errors.HSN}
                helperText={touched.HSN && errors.HSN}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Unit Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unit_name}
                name="unit_name"
                error={!!touched.unit_name && !!errors.unit_name}
                helperText={touched.unit_name && errors.unit_name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Alert Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.alert_quantity}
                name="alert_quantity"
                error={!!touched.alert_quantity && !!errors.alert_quantity}
                helperText={touched.alert_quantity && errors.alert_quantity}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Brand Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand_name}
                name="brand_name"
                error={!!touched.brand_name && !!errors.brand_name}
                helperText={touched.brand_name && errors.brand_name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Lot Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lot_number}
                name="lot_number"
                error={!!touched.lot_number && !!errors.lot_number}
                helperText={touched.lot_number && errors.lot_number}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Expire Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expire_date}
                name="expire_date"
                error={!!touched.expire_date && !!errors.expire_date}
                helperText={touched.expire_date && errors.expire_date}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Purchase Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.purchase_price}
                name="purchase_price"
                error={!!touched.purchase_price && !!errors.purchase_price}
                helperText={touched.purchase_price && errors.purchase_price}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tax Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tax_name}
                name="tax_name"
                error={!!touched.tax_name && !!errors.tax_name}
                helperText={touched.tax_name && errors.tax_name}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Tax Value"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tax_value}
                name="tax_value"
                error={!!touched.tax_value && !!errors.tax_value}
                helperText={touched.tax_value && errors.tax_value}
                sx={{ gridColumn: "span 1" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 1" }}
              >
                <InputLabel>Tax Type</InputLabel>
                <Select
                  value={values.tax_type || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="tax_type"
                  error={!!touched.tax_type && !!errors.tax_type}
                >
                  <MenuItem value="Inclusive">Inclusive</MenuItem>
                  <MenuItem value="Exclusive">Exclusive</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sales Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sales_price}
                name="sales_price"
                error={!!touched.sales_price && !!errors.sales_price}
                helperText={touched.sales_price && errors.sales_price}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Opening Stock"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.opening_stock}
                name="opening_stock"
                error={!!touched.opening_stock && !!errors.opening_stock}
                helperText={touched.opening_stock && errors.opening_stock}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Barcode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.barcode}
                name="barcode"
                error={!!touched.barcode && !!errors.barcode}
                helperText={touched.barcode && errors.barcode}
                sx={{ gridColumn: "span 1" }}
              />
              {/* 
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Discount Type"
                placeholder="Percentage or Fixed"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.discount_type}
                name="discount_type"
                error={!!touched.discount_type && !!errors.discount_type}
                helperText={touched.discount_type && errors.discount_type}
                sx={{ gridColumn: "span 1" }}
              /> */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 1" }}
              >
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={values.discount_type || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="discount_type"
                  error={!!touched.discount_type && !!errors.discount_type}
                >
                  <MenuItem value="">Select Discount Type</MenuItem>
                  <MenuItem value="Percentage">Percentage</MenuItem>
                  <MenuItem value="Fixed">Fixed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Discount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.discount}
                name="discount"
                error={!!touched.discount && !!errors.discount}
                helperText={touched.discount && errors.discount}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  item_name: yup.string().required("required"),
  category_name: yup.string().required("required"),
  sku: yup.string(),
  hsn: yup.string(),
  unit_name: yup.string().required("required"),
  alert_quantity: yup.number(),
  brand_name: yup.string(),
  lot_number: yup.number(),
  expire_date: yup.date(),
  purchase_price: yup.number().required("required"),
  tax_name: yup.string().required("required"),
  tax_value: yup.number().required("required"),
  tax_type: yup.string().required("required"),
  sales_price: yup.number().required("required"),
  opening_stock: yup.number().required("required"),
  barcode: yup.number(),
  discount_type: yup.string(),
  discount: yup.number(),
});

const initialValues = {
  item_name: "",
  category_name: "",
  sku: "",
  hsn: "",
  unit_name: "",
  alert_quantity: 0,
  brand_name: "",
  lot_number: 0,
  expire_date: "",
  purchase_price: 0,
  tax_name: "",
  tax_value: 0,
  tax_type: "",
  sales_price: 0,
  opening_stock: 0,
  barcode: 0,
  discount_type: "",
  discount: 0,
};

export default EditProduct;

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
