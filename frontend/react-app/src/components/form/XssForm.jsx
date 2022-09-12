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
        initialValues={{ name: "", uri: "", code: "" }}
        onSubmit={({ name, uri, code }) => {
          eval(`console.log("${name}");`);

          const div = document.querySelector("#message");
          div.innerHTML = `Welcome, ${name}`;

          if (code) {
            const script = document.createElement("script");
            script.innerHTML = code;
            window.document.appendChild(script);

            const f = new Function(code);
            f();
          }

          if (uri) {
            window.location.href = uri;
            document.location.href = uri;
          }
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
            <label>
              Code: <Field name="code" />
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
