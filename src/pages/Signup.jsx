// import React, { useState } from "react";
// import styled from "styled-components";
// import Navbar from "./../components/Header/Navbar";
// import BackgroundImage from "../components/BackgroundImage";

// const Container = styled.div;

// const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 300px;
//   margin: 0 auto;
// `;

// const FormTitle = styled.h2`
//   font-size: 24px;
//   margin-bottom: 20px;
// `;

// const InputField = styled.input`
//   padding: 10px;
//   margin: 10px 0;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const SubmitButton = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;
// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // signUpUser(formData);
//   };
//   return (
//     <Container>
//       <Navbar />
//       <BackgroundImage />
//       <FormContainer>
//         <FormTitle>Sign Up</FormTitle>
//         <form onSubmit={handleSubmit}>
//           <InputField
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <InputField
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <InputField
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <SubmitButton type="submit">Sign Up</SubmitButton>
//         </form>
//       </FormContainer>
//     </Container>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/Banner/BackgroundImage";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Log In</button>}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup;
