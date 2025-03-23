
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } 
        from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

    // 🔹 Firebase 설정 (네 Firebase 프로젝트 정보로 변경해야 함)
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyBK3zgRRbljFIM5CaNPwVtV5vR5AkxVntM",
    authDomain: "gameforge-0509a.firebaseapp.com",
    projectId: "gameforge-0509a",
    storageBucket: "gameforge-0509a.appspot.com",
    messagingSenderId: "200416178504",
    appId: "1:200416178504:web:578fea7e9e8aac1b02837d",
    measurementId: "G-75V29Y6F3C"
    };

    // 🔹 Firebase 초기화
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // 🔹 회원가입
    async function signup(email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("회원가입 성공!");
            window.location.href = "index.html"; // 메인 페이지로 이동
        } catch (error) {
            alert(error.message);
        }
    }

    // 🔹 로그인
    async function login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("로그인 성공!");
            window.location.href = "index.html"; // 메인 페이지로 이동
        } catch (error) {
            alert("로그인 실패: " + error.message);
        }
    }

    // 🔹 구글 로그인
    async function googleLogin() {
        try {
            await signInWithPopup(auth, provider);
            alert("Google 로그인 성공!");
            window.location.href = "index.html";
        } catch (error) {
            alert("Google 로그인 실패: " + error.message);
        }
    }

    // 🔹 로그아웃
    async function logout() {
        await signOut(auth);
        alert("로그아웃 완료!");
        window.location.href = "login.html";
    }

    // 🔹 로그인 상태 유지
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("JWT 토큰:", user.accessToken);  // JWT 토큰 확인
            console.log("현재 로그인된 사용자:", user.email);
            document.getElementById("logout-btn").style.display = "block";
        } else {
            console.log("사용자가 로그인하지 않음");
            document.getElementById("logout-btn").style.display = "none";
        }
    });

    // 🔹 전역 변수로 함수 등록 (HTML 버튼에서 직접 호출 가능)
    window.signup = signup;
    window.login = login;
    window.googleLogin = googleLogin;
    window.logout = logout;
