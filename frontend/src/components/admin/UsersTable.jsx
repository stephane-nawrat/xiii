// ==========================================
// XIII Frontend - UsersTable Component
// ==========================================
// Tableau liste users avec filtres et actions CRUD

// === IMPORTS ===
import { useState, useEffect } from 'react';
import api from '../../services/api';

function UsersTable() {
  // === STATES ===
  // users: liste complète depuis API
  const [users, setUsers] = useState([]);
  
  // filteredUsers: liste filtrée selon roleFilter
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // roleFilter: filtre actif ('all', 'photographer', 'visitor', 'guest')
  const [roleFilter, setRoleFilter] = useState('all');
  
  // loading: true pendant fetch API
  const [loading, setLoading] = useState(true);
  
  // error: message erreur si API fail
  const [error, setError] = useState(null);

  // === EFFECT: FETCH USERS ===
  // Exécuté 1 fois au montage component
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // API call GET /admin/users
        // Retourne: { users: [...] }
        const response = await api.get('/admin/users');
        
        // Stocker users (exclure admins role_id = 1)
        const nonAdminUsers = response.data.users.filter(user => user.role_id !== 1);
        setUsers(nonAdminUsers);
        setError(null);
        
      } catch (err) {
        console.error('Erreur fetch users:', err);
        setError('Impossible de charger les utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // [] = exécute 1 fois

  // === EFFECT: FILTER USERS ===
  // Exécuté quand users ou roleFilter change
  useEffect(() => {
    if (roleFilter === 'all') {
      // Pas de filtre: afficher tous
      setFilteredUsers(users);
    } else {
      // Filtrer par role_name
      // roleFilter = 'photographer' → role_name = 'photographer'
      const filtered = users.filter(user => 
        user.role_name.toLowerCase() === roleFilter.toLowerCase()
      );
      setFilteredUsers(filtered);
    }
  }, [users, roleFilter]); // Dépendances: recalcule si users ou roleFilter change

  // === HANDLERS ===
  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const handleEdit = (userId) => {
    // TODO: Ouvrir SlidePanel edit (Phase suivante)
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId) => {
    // TODO: Ouvrir modal confirmation (Phase suivante)
    console.log('Delete user:', userId);
  };

  return (
    <div>
      
      {/* === HEADER: FILTERS + CREATE BUTTON === */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        
        {/* Filters */}
        <div className="flex gap-3">
          {/* Role Filter Dropdown */}
          <select
            value={roleFilter}
            onChange={handleRoleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-carbon bg-cream"
          >
            <option value="all">All Roles</option>
            <option value="photographer">Photographers</option>
            <option value="visitor">Visitors</option>
            <option value="guest">Guests</option>
          </select>
        </div>

        {/* Create User Button */}
        <button className="px-6 py-2 bg-carbon text-cream text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
          + Create User
        </button>
      </div>

      {/* === INFO BAR === */}
      <div className="mb-4">
        <p className="text-sm text-gray-text">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} 
          {roleFilter !== 'all' && ` (${roleFilter}s)`}
        </p>
      </div>

      {/* === LOADING STATE === */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-text">Loading users...</p>
        </div>
      )}

      {/* === ERROR STATE === */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* === TABLE (Desktop) === */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">
                  ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">
                  First Name
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">
                  Last Name
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredUsers.length === 0 ? (
                // Pas de users
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-text text-sm">
                    No users found
                  </td>
                </tr>
              ) : (
                // Map users → rows
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-cream-light transition-colors">
                    
                    {/* ID */}
                    <td className="py-3 px-4 text-sm text-carbon">
                      {user.id}
                    </td>
                    
                    {/* Email */}
                    <td className="py-3 px-4 text-sm text-carbon">
                      {user.email}
                    </td>
                    
                    {/* First Name */}
                    <td className="py-3 px-4 text-sm text-carbon">
                      {user.firstname || '-'}
                    </td>
                    
                    {/* Last Name */}
                    <td className="py-3 px-4 text-sm text-carbon">
                      {user.lastname || '-'}
                    </td>
                    
                    {/* Role */}
                    <td className="py-3 px-4 text-sm">
                      <span className={`
                        inline-block px-2 py-1 rounded text-xs font-medium
                        ${user.role_name === 'photographer' ? 'bg-blue-100 text-blue-700' : ''}
                        ${user.role_name === 'visitor' ? 'bg-green-100 text-green-700' : ''}
                        ${user.role_name === 'guest' ? 'bg-gray-100 text-gray-700' : ''}
                      `}>
                        {user.role_name}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {/* View (disabled/grisé) */}
                        <button
                          disabled
                          className="text-xs text-gray-text opacity-50 cursor-not-allowed px-2 py-1"
                          title="Coming soon"
                        >
                          View
                        </button>
                        
                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-xs text-carbon hover:underline px-2 py-1"
                        >
                          Edit
                        </button>
                        
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-xs text-red-600 hover:underline px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default UsersTable;