import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Text, useToast } from "@chakra-ui/react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Redirect to ResultPage with state
      navigate("/result", { state: formData });
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phoneNumber}>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.address}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} />
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>

      {submittedData && (
        <Box mt={10}>
          <Text fontSize="xl" fontWeight="bold">
            Submitted Data:
          </Text>
          <Text>Name: {submittedData.name}</Text>
          <Text>Email: {submittedData.email}</Text>
          <Text>Phone Number: {submittedData.phoneNumber}</Text>
          <Text>Address: {submittedData.address}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Index;
