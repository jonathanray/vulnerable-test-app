import React from "react";
import { Field, Form, Formik, useFormikContext } from "formik";

const XssForm = () => {
  const WelcomeMessage = () => {
    const { values } = useFormikContext();
    const message = `Welcome, ${values.name || "Nobody"}`;
    return <div dangerouslySetInnerHTML={{ __html: message }}></div>;
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "Bruno", uri: "" }}
        onSubmit={({ name, uri }) => {
          console.log(name);
          window.location.href = uri;
        }}
      >
        <Form>
          <div>
            <label>
              Name:
              <Field autoFocus name="name" />
            </label>
          </div>
          <div>
            <label>
              URI: <Field name="uri" />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <WelcomeMessage />
        </Form>
      </Formik>
    </div>
  );
};

export default XssForm;
