import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const name = useField("text");  
  const email = useField("email");
  const password = useField("password");
  const role = useField("text");
  const bio = useField("text");

  const { signup, error } = useSignup("https://sw1-week7-sw1-exam-recap1.onrender.com/api/users/signup");

  const handleFormSubmit = async (e) => {
    console.log(email.value, password.value, name.value,role.value,bio.value)
    e.preventDefault();
    await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      role: role.value,
      bio: bio.value
    });
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>Role:</label>
        <input {...role} />
        <label>Bio:</label>
        <input {...bio} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
