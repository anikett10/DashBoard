import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const MyProfile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const predefinedValues = {
    name: "Amit Desai",
    email: "amit.desai@greattraditions.in",
    password: "********",
    phone: "+919871234567",
    businessName: "Great Traditions",
    msmeId: "GJ23E0000345",
    gstin: "24AABCD1234K1ZA",
    businessAddress: "55, CG Road, Ahmedabad, Gujarat, 380009",
  };

  return (
    <Box m="20px">
      <Header title="MY PROFILE" subtitle="Your Profile Information" />

      <Formik
        initialValues={predefinedValues}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <form>
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
                label="Name"
                value={values.name}
                name="name"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                value={values.email}
                name="email"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                value={values.password}
                name="password"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                value={values.phone}
                name="phone"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Business Name"
                value={values.businessName}
                name="businessName"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="MSME ID"
                value={values.msmeId}
                name="msmeId"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="GSTIN Number"
                value={values.gstin}
                name="gstin"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Business Address"
                value={values.businessAddress}
                name="businessAddress"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MyProfile;
