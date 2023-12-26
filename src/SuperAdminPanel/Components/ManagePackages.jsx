import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManagePackages.css';

const UpdatePackageModal = ({ packageToUpdate, onUpdate, onClose }) => {
  const [name, setName] = useState(packageToUpdate.name);
  const [city, setCity] = useState(packageToUpdate.city);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Update Package</h2>
        <label htmlFor="packageName">Package Name:</label>
        <input
          id="packageName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="city">City:</label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={() => onUpdate({ ...packageToUpdate, name, city })}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch('http://localhost:3000/api/super-admin/getAllPackages', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPackages(data.data);
      }
    };
    fetchPackages();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const togglePackageStatus = async (packageId, disable) => {
    const endpoint = disable ? 'disable_package' : 'enable_package';
    const response = await fetch(`http://localhost:3000/api/super-admin/${endpoint}/${packageId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });

    if (response.ok) {
      const updatedPackages = packages.map(pkg =>
        pkg._id === packageId ? { ...pkg, disabled: disable } : pkg
      );
      setPackages(updatedPackages);
    }
  };

  const openUpdateModal = (pkg) => {
    setCurrentPackage(pkg);
    setShowModal(true);
  };

  const closeUpdateModal = () => {
    setShowModal(false);
    setCurrentPackage(null);
  };
  const handleUpdatePackage = async (updatedPackage) => {
    try {
      const response = await fetch(`http://localhost:3000/api/super-admin/update_package/${updatedPackage._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          name: updatedPackage.name,
          destination: updatedPackage.destination,
          // include other fields that you need to update
        }),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        // Update local state to reflect the changes
        setPackages(packages.map(pkg => pkg._id === updatedPackage._id ? updatedPackage : pkg));
        closeUpdateModal();
      } else {
        console.error('Failed to update package:', await response.text());
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };
  

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pkg.city && pkg.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="manage-packages">
      <Sidebar />
      <div className="packages-content">
        <input
          type="text"
          placeholder="Search Packages"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <div className="package-list">
          {filteredPackages.map((pkg) => (
            <div key={pkg._id} className={`package-card ${pkg.disabled ? 'disabled' : ''}`}>
              <div>{pkg.name}</div>
              <div>{pkg.city}</div>
              <div>{pkg.totalBookings}</div>
              <div className="button-group">
                <button onClick={() => togglePackageStatus(pkg._id, true)} disabled={pkg.disabled}>
                  Disable
                </button>
                <button onClick={() => togglePackageStatus(pkg._id, false)} disabled={!pkg.disabled}>
                  Enable
                </button>
                <button onClick={() => openUpdateModal(pkg)}>
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && currentPackage && (
        <UpdatePackageModal
          packageToUpdate={currentPackage}
          onUpdate={handleUpdatePackage}
          onClose={closeUpdateModal}
        />
      )}
    </div>
  );
};

export default ManagePackages;
