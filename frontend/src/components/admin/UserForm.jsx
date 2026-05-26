// ==========================================
// XIII Frontend - UserForm Component
// ==========================================
// Formulaire création/édition user
// Modes: create (tous champs) | edit (sans password)

import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

function UserForm({ mode = 'create', userData = null, onSubmit, onCancel }) {
  // === PROPS ===
  // mode: 'create' | 'edit'
  // userData: objet user (null si create, rempli si edit)
  // onSubmit: function callback avec formData
  // onCancel: function callback annulation

  // === STATES FORM ===
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role_id: 2, // Default: photographer
  });

  // === STATE ERRORS ===
  const [errors, setErrors] = useState({});

  // === EFFECT: PRÉ-REMPLIR SI MODE EDIT ===
  useEffect(() => {
    if (mode === 'edit' && userData) {
      setFormData({
        email: userData.email || '',
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        role_id: userData.role_id || 2,
        // Pas de password en mode edit
      });
    }
  }, [mode, userData]);

  // === HANDLER: CHANGE INPUT ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // === VALIDATION ===
  const validate = () => {
    const newErrors = {};

    // Email required + format
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password required en mode create uniquement
    if (mode === 'create') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    // Firstname required
    if (!formData.firstname) {
      newErrors.firstname = 'First name is required';
    }

    // Lastname required
    if (!formData.lastname) {
      newErrors.lastname = 'Last name is required';
    }

    return newErrors;
  };

  // === HANDLER: SUBMIT ===
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valider form
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      // Il y a des erreurs
      setErrors(validationErrors);
      return;
    }

    // Pas d'erreurs → callback parent avec data
    // En mode edit, ne pas envoyer password
    const dataToSubmit = mode === 'edit' 
      ? { 
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          role_id: parseInt(formData.role_id)
        }
      : formData;

    onSubmit(dataToSubmit);
  };

  // === ROLES OPTIONS ===
  const roles = [
    { id: 2, name: 'Photographer' },
    { id: 3, name: 'Visitor' },
    { id: 4, name: 'Guest' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-carbon mb-2">
          Email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="user@example.com"
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password (seulement mode create) */}
      {mode === 'create' && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-carbon mb-2">
            Password *
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 6 characters"
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>
      )}

      {/* Firstname */}
      <div>
        <label htmlFor="firstname" className="block text-sm font-medium text-carbon mb-2">
          First Name *
        </label>
        <Input
          id="firstname"
          name="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="John"
        />
        {errors.firstname && (
          <p className="text-xs text-red-600 mt-1">{errors.firstname}</p>
        )}
      </div>

      {/* Lastname */}
      <div>
        <label htmlFor="lastname" className="block text-sm font-medium text-carbon mb-2">
          Last Name *
        </label>
        <Input
          id="lastname"
          name="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Doe"
        />
        {errors.lastname && (
          <p className="text-xs text-red-600 mt-1">{errors.lastname}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role_id" className="block text-sm font-medium text-carbon mb-2">
          Role *
        </label>
        <select
          id="role_id"
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-carbon bg-cream"
        >
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-carbon text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-carbon text-cream text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          {mode === 'create' ? 'Create User' : 'Update User'}
        </button>
      </div>

    </form>
  );
}

export default UserForm;