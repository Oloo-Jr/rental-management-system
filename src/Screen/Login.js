import { useState, useEffect } from 'react';
import { Mail, Lock, User, Building, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../Database/config';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!isLogin) {
      if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    try {
      if (isLogin) {
        // Handle Login
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        navigate('/dashboard');
      } else {
        // Sign up new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Store additional user data in Firestore
        const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || '',
          createdAt: new Date().toISOString(),
        };

        await setDoc(doc(db, 'Users', userCredential.user.uid), userData);
        navigate('/dashboard');
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect email or password.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        default:
          setError(error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required={!isLogin}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-black font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;