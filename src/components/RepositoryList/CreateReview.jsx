import { useFormik } from "formik";
import { Pressable, TextInput, View } from "react-native";
import * as yup from "yup";
import theme, { formStyles as styles } from "../../theme";
import { Text } from "../ui/Text";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../../graphql/mutations";
import { useNavigate } from "react-router-native";

const CreateReviewForm = ({ createReviewMutation }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema: yup.object({
      ownerName: yup.string().required("Owner's name is required"),
      repositoryName: yup.string().required("Repository's name is required"),
      rating: yup
        .number()
        .required()
        .integer()
        .min(0)
        .max(100, "Rating must be a number between 0 and 100"),
      text: yup.string(),
    }),
    onSubmit: (values) => {
      createReviewMutation({
        variables: {
          review: { ...values, rating: Number(values.rating) },
        },
      });
    },
  });

  const checkOwnerNameValidation =
    formik.touched.ownerName && formik.errors.ownerName;
  const checkRepositoryNameValidation =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const checkRatingValidation = formik.touched.rating && formik.errors.rating;
  const checkTextValidation = formik.touched.text && formik.errors.text;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Repository owner name"
          style={[
            styles.textInput,
            checkOwnerNameValidation && styles.errorBorder,
          ]}
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
          onBlur={formik.handleBlur("ownerName")}
        />
        {checkOwnerNameValidation && (
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
            checkRepositoryNameValidation && styles.errorBorder,
          ]}
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange("repositoryName")}
          onBlur={formik.handleBlur("repositoryName")}
        />
        {checkRepositoryNameValidation && (
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
            checkRatingValidation && styles.errorBorder,
          ]}
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
          onBlur={formik.handleBlur("rating")}
        />
        {checkRatingValidation && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.rating}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          multiline
          placeholder="Review"
          style={[styles.textInput, checkTextValidation && styles.errorBorder]}
          value={formik.values.text}
          onChangeText={formik.handleChange("text")}
          onBlur={formik.handleBlur("text")}
        />
        {checkTextValidation && (
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
  const [mutate] = useMutation(CREATE_REVIEW, {
    onCompleted: ({ createReview: { repositoryId } }) => {
      navigate(`/repository/${repositoryId}`);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return <CreateReviewForm createReviewMutation={mutate} />;
};

export default CreateReview;
