import { Formik } from "formik";
import { Pressable, View } from "react-native";
import * as yup from "yup";
import { formStyles as styles } from "../theme";
import { Text } from "./ui/Text";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
import { useState } from "react";
import FormikTextInput from "./ui/FormikTextInput";

const validationSchema = yup.object({
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
});
const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

export const CreateReviewForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <View>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View>
        <FormikTextInput
          keyboardType="numeric"
          name="rating"
          placeholder="Rating 0-100"
        />
      </View>
      <View>
        <FormikTextInput multiline name="text" placeholder="Review" />
      </View>
      <Pressable onPress={handleSubmit} style={styles.submitPressable}>
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
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const review = {
            ...values,
            rating: Number(values.rating),
          };

          onCreateReview(review);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm handleSubmit={handleSubmit} />}
      </Formik>

      {errorMessage && createErrorAlert(errorMessage)}
    </>
  );
};

export default CreateReview;
