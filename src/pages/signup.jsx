import Link from "next/link";
import { MainLayout } from "src/layouts/MainLayout";
import { db } from "src/lib/firebase";
import { auth } from "src/lib/firebase";

const SignUp = (props) => {
  // ðloginã§useræå ±ã_appã§ã°ã­ã¼ãã«ã«ç¶æãæããã¦ããã®
  const { email, setEmail, password, setPassword, getUserInfo } = props;

  const createUser = async () => {
    try {
      await auth
        // ã¡ã¼ã«ã¢ãã¬ã¹ã¨ãã¹ã¯ã¼ããä½¿ç¨ãã¦ã¦ã¼ã¶ã¼ã®æ°è¦ç»é²
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          // uidããã¨ã«ãã¼ã¿ãã¼ã¹ãä½æ;
          db.collection("users").doc(user.uid).set({
            name: "ååæªè¨­å®", //ããã©ã«ãã¯æªè¨­å®ã«ãã¨ã
            todos: [],
          });
          console.log("ãã¼ã¿ç»é²å®äºï¼");
        });
      getUserInfo();
    } catch (error) {
      console.log("error");
      alert("ç»é²ã§ãã¾ããã(æ¢ã«ç»é²ããã¦ããå¯è½æ§ãããã¾ãã)");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-white text-6xl font-extrabold text-center">
          æ°è¦ç»é² ð
        </h1>

        <div className="w-64 pt-16 pb-10">
          <div className="pb-6 flex flex-col">
            <label>email</label>
            <input
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="h-10 p-2 border text-sm rounded-lg"
            />
          </div>

          <div className="pb-10 flex flex-col">
            <label>password</label>
            <input
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="h-10 p-2 border text-sm rounded-lg"
            />
          </div>

          <button
            onClick={createUser}
            className="h-11 w-full bg-gray-500 text-white rounded-full"
          >
            æ°è¦ç»é²
          </button>
        </div>

        <p className="text-sm pb-6">ãããã¯</p>

        <Link href="/login">
          <a className="text-blue-500 border-b border-blue-500">
            ã­ã°ã¤ã³ç»é¢ã¸ &gt;
          </a>
        </Link>
      </div>
    </MainLayout>
  );
};

export default SignUp;
