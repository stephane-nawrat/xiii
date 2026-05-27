// ==========================================
// XIII Frontend - UsersTable Component
// ==========================================
// Tableau liste users avec filtres et CRUD complet
// Notifications toast via NotificationContext (succès/erreur)

// === IMPORTS ===
import { useState, useEffect } from 'react';
import api from '../../services/api';
import SlidePanel  from '../ui/SlidePanel';
import ConfirmModal from '../ui/ConfirmModal';
import UserForm    from './UserForm';

// useNotification : accès au système de notifications toast
import { useNotification } from '../../context/NotificationContext';

function UsersTable({ onUserChange }) {

  // === NOTIFICATIONS ===
  // Accès aux fonctions toast : success (vert), error (rouge)
  // error renommé en notify → évite conflit avec le state 'error' ci-dessous
  const { success, error: notify } = useNotification();

  // === STATES DATA ===
  // users         : liste complète depuis API
  // filteredUsers : liste filtrée selon roleFilter
  // roleFilter    : filtre actif ('all', 'photographer', 'visitor', 'guest')
  // loading       : true pendant fetch API
  // error         : message erreur si API fail
  const [users,         setUsers]         = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter,    setRoleFilter]    = useState('all');
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  // === STATES CRUD ===
  // slidePanelOpen : panel create/edit ouvert ou fermé
  // panelMode      : 'create' | 'edit'
  // selectedUser   : user en cours d'édition (null si create)
  // deleteModalOpen : modal confirmation suppression
  // userToDelete   : user en attente de suppression
  const [slidePanelOpen,  setSlidePanelOpen]  = useState(false);
  const [panelMode,       setPanelMode]       = useState('create');
  const [selectedUser,    setSelectedUser]    = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete,    setUserToDelete]    = useState(null);

  // === EFFECT: FETCH USERS AU MONTAGE ===
  // Exécuté une seule fois quand le composant apparaît
  useEffect(() => {
    fetchUsers();
  }, []);

  // === FUNCTION: FETCH USERS ===
  // Récupère la liste des users depuis GET /admin/users
  // Exclut les admins (role_id = 1) — pas gérés via cette interface
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      const nonAdminUsers = response.data.users.filter(u => u.role_id !== 1);
      setUsers(nonAdminUsers);
      setError(null);
    } catch (err) {
      console.error('Erreur fetch users:', err);
      setError('Impossible de charger les utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  // === EFFECT: FILTRE RÉACTIF ===
  // Recalcule filteredUsers chaque fois que users ou roleFilter change
  // Filtre local (pas de re-fetch API) → instantané
  useEffect(() => {
    if (roleFilter === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(u => u.role_name.toLowerCase() === roleFilter.toLowerCase())
      );
    }
  }, [users, roleFilter]);

  // === HANDLERS CRUD ===

  // Ouvre SlidePanel en mode create (form vide)
  const handleCreate = () => {
    setPanelMode('create');
    setSelectedUser(null);
    setSlidePanelOpen(true);
  };

  // Ouvre SlidePanel en mode edit (form pré-rempli avec user)
  const handleEdit = (user) => {
    setPanelMode('edit');
    setSelectedUser(user);
    setSlidePanelOpen(true);
  };

  // Ouvre modal de confirmation avant suppression
  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  // === HANDLER: SUBMIT FORM (CREATE ou EDIT) ===
  // Appelé par UserForm après validation
  // POST /users pour create, PUT /users/:id pour edit
  const handleFormSubmit = async (formData) => {
    try {
      if (panelMode === 'create') {
        await api.post('/users', formData);
        success('User created successfully');   // ← Toast vert
      } else {
        await api.put(`/users/${selectedUser.id}`, formData);
        success('User updated successfully');   // ← Toast vert
      }

      // Fermer panel + refresh liste + refresh stats Dashboard
      setSlidePanelOpen(false);
      fetchUsers();
      if (onUserChange) onUserChange();

    } catch (err) {
      console.error('Erreur submit form:', err);
      notify('Failed to save user. Please try again.');  // ← Toast rouge
    }
  };

  // === HANDLER: CONFIRM DELETE ===
  // Appelé après confirmation dans ConfirmModal
  // DELETE /users/:id
  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/users/${userToDelete.id}`);
      success('User deleted successfully');   // ← Toast vert

      // Fermer modal + refresh liste + refresh stats Dashboard
      setDeleteModalOpen(false);
      setUserToDelete(null);
      fetchUsers();
      if (onUserChange) onUserChange();

    } catch (err) {
      console.error('Erreur delete user:', err);
      notify('Failed to delete user. Please try again.');  // ← Toast rouge
    }
  };

  // === HANDLER: FILTRE RÔLE ===
  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  return (
    <div>

      {/* === HEADER: FILTRES + BOUTON CREATE === */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

        {/* Dropdown filtre par rôle */}
        <div className="flex gap-3">
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

        {/* Bouton ouvrir SlidePanel create */}
        <button
          onClick={handleCreate}
          className="px-6 py-2 bg-carbon text-cream text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Create User
        </button>
      </div>

      {/* === INFO BAR : nombre de users affichés === */}
      <div className="mb-4">
        <p className="text-sm text-gray-text">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          {roleFilter !== 'all' && ` (${roleFilter}s)`}
        </p>
      </div>

      {/* === ÉTAT LOADING === */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-text">Loading users...</p>
        </div>
      )}

      {/* === ÉTAT ERREUR FETCH === */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* === TABLEAU USERS (Desktop) === */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            {/* En-têtes colonnes */}
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">Email</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">First Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">Last Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">Role</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-text uppercase tracking-wide">Actions</th>
              </tr>
            </thead>

            {/* Lignes users */}
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-text text-sm">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-cream-light transition-colors">

                    <td className="py-3 px-4 text-sm text-carbon">{user.id}</td>
                    <td className="py-3 px-4 text-sm text-carbon">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-carbon">{user.firstname || '-'}</td>
                    <td className="py-3 px-4 text-sm text-carbon">{user.lastname || '-'}</td>

                    {/* Badge rôle avec couleur selon role_name */}
                    <td className="py-3 px-4 text-sm">
                      <span className={`
                        inline-block px-2 py-1 rounded text-xs font-medium
                        ${user.role_name === 'photographer' ? 'bg-blue-100 text-blue-700'  : ''}
                        ${user.role_name === 'visitor'      ? 'bg-green-100 text-green-700': ''}
                        ${user.role_name === 'guest'        ? 'bg-gray-100 text-gray-700'  : ''}
                      `}>
                        {user.role_name}
                      </span>
                    </td>

                    {/* Boutons actions : View (désactivé), Edit, Delete */}
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button disabled title="Coming soon"
                          className="text-xs text-gray-text opacity-50 cursor-not-allowed px-2 py-1">
                          View
                        </button>
                        <button onClick={() => handleEdit(user)}
                          className="text-xs text-carbon hover:underline px-2 py-1">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user)}
                          className="text-xs text-red-600 hover:underline px-2 py-1">
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

      {/* === SLIDEPANEL CREATE / EDIT === */}
      <SlidePanel
        isOpen={slidePanelOpen}
        onClose={() => setSlidePanelOpen(false)}
        title={panelMode === 'create' ? 'Create User' : 'Edit User'}
      >
        <UserForm
          mode={panelMode}
          userData={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setSlidePanelOpen(false)}
        />
      </SlidePanel>

      {/* === MODAL CONFIRMATION DELETE === */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.email}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
        }}
      />

    </div>
  );
}

export default UsersTable;