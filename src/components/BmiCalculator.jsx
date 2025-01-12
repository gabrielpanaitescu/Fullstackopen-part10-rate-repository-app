import { useFormik } from "formik";
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import * as yup from "yup";

const styles = StyleSheet.create({
  textInput: {
    padding: 8,
    borderWidth: 2,
    borderColor: "black",
  },
});

const initialValues = {
  height: "",
  mass: "",
};

const bmiValuesSchema = yup.object().shape({
  height: yup
    .number()
    .min(0.5, "Value must be greater or equal to 0.5")
    .required("Height is required"),

  mass: yup
    .number()
    .min(1, "Value must be greater or equal to 1")
    .required("Weight is required"),
});

const getBMI = (mass, height) => Math.round(mass / Math.pow(height, 2));

export const BmiCalculator = () => {
  const onSubmit = () => {
    const height = parseFloat(formik.values.height);
    const mass = parseFloat(formik.values.mass);

    if (!isNaN(mass) && !isNaN(height) && height !== 0) {
      console.log(`Your BMI is ${getBMI(mass, height)}`);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: bmiValuesSchema,
  });

  return (
    <View>
      <Text>Bmi calculator</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Mass (m)"
        value={formik.values.mass}
        onChangeText={formik.handleChange("mass")}
      />
      {formik.touched.mass && formik.errors.mass && (
        <Text style={{ color: "red" }}>{formik.errors.mass}</Text>
      )}

      <TextInput
        style={styles.textInput}
        placeholder="Height (m)"
        value={formik.values.height}
        onChangeText={formik.handleChange("height")}
      />
      {formik.touched.height && formik.errors.height && (
        <Text style={{ color: "red" }}>{formik.errors.height}</Text>
      )}

      <Pressable onPress={formik.handleSubmit}>
        <Text>Calculate</Text>
      </Pressable>
    </View>
  );
};
