import { useFormik } from "formik";
import { Pressable, TextInput, View } from "react-native";
import * as yup from "yup";
import theme, { formStyles as styles } from "../theme";
import { Text } from "./ui/Text";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
import { useState } from "react";

export const CreateReviewForm = ({ onCreateReview }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema: yup.object({
      ownerName: yup.string().required("owner's name is a required field"),
      repositoryName: yup
        .string()
        .required("repository's name is a required field"),
      rating: yup
        .number()
        .required()
        .integer()
        .min(0)
        .max(100, "Rating must be a number between 0 and 100"),
      text: yup.string(),
    }),
    onSubmit: (values) => {
      const review = {
        ...values,
        rating: Number(values.rating),
      };

      onCreateReview(review);
    },
  });

  const ownerNameValidationError =
    formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameValidationError =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingValidationError = formik.touched.rating && formik.errors.rating;
  const textValidationError = formik.touched.text && formik.errors.text;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Repository owner name"
          style={[
            styles.textInput,
            ownerNameValidationError && styles.errorBorder,
          ]}
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
          onBlur={formik.handleBlur("ownerName")}
        />
        {ownerNameValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.ownerName}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Repository name"
          style={[
            styles.textInput,
            repositoryNameValidationError && styles.errorBorder,
          ]}
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange("repositoryName")}
          onBlur={formik.handleBlur("repositoryName")}
        />
        {repositoryNameValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.repositoryName}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          placeholder="Rating 0-100"
          style={[
            styles.textInput,
            ratingValidationError && styles.errorBorder,
          ]}
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
          onBlur={formik.handleBlur("rating")}
        />
        {ratingValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.rating}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          multiline
          placeholder="Review"
          style={[styles.textInput, textValidationError && styles.errorBorder]}
          value={formik.values.text}
          onChangeText={formik.handleChange("text")}
          onBlur={formik.handleBlur("text")}
        />
        {textValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.text}
          </Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.submitPressable}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW);
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreateReview = async (review) => {
    const data = await mutate({
      variables: {
        review,
      },
      onCompleted: ({ createReview: { repositoryId } }) => {
        navigate(`/repository/${repositoryId}`);
      },
      onError: (error) => {
        if (!error.message) {
          setErrorMessage("Unknown error");
        } else {
          setErrorMessage(error.message);
        }
        console.log(error);
      },
    });
  };

  const createErrorAlert = (message) => {
    setErrorMessage(null);
    return Alert.alert("Error!", message);
  };

  return (
    <>
      <CreateReviewForm onCreateReview={onCreateReview} />
      {errorMessage && createErrorAlert(errorMessage)}
    </>
  );
};

export default CreateReview;
