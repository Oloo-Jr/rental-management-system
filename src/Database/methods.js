// Firebase utility functions for modal data handling
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config'; // Make sure to import your Firebase config

export const addPropertyToFirestore = async (userId, propertyData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const propertiesCollectionRef = collection(userDocRef, 'properties');
    
    const propertyWithTimestamp = {
      ...propertyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(propertiesCollectionRef, propertyWithTimestamp);
    return { success: true, propertyId: docRef.id };
  } catch (error) {
    console.error('Error adding property:', error);
    return { success: false, error: error.message };
  }
};

export const addTenantToFirestore = async (userId, tenantData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const tenantsCollectionRef = collection(userDocRef, 'tenants');
    
    const tenantWithTimestamp = {
      ...tenantData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(tenantsCollectionRef, tenantWithTimestamp);
    return { success: true, tenantId: docRef.id };
  } catch (error) {
    console.error('Error adding tenant:', error);
    return { success: false, error: error.message };
  }
};

export const addPaymentToFirestore = async (userId, paymentData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const paymentsCollectionRef = collection(userDocRef, 'payments');
    
    const paymentWithTimestamp = {
      ...paymentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(paymentsCollectionRef, paymentWithTimestamp);
    return { success: true, paymentId: docRef.id };
  } catch (error) {
    console.error('Error recording payment:', error);
    return { success: false, error: error.message };
  }
};

export const addMaintenanceRequestToFirestore = async (userId, requestData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const maintenanceCollectionRef = collection(userDocRef, 'maintenance');
    
    const requestWithTimestamp = {
      ...requestData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(maintenanceCollectionRef, requestWithTimestamp);
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error('Error adding maintenance request:', error);
    return { success: false, error: error.message };
  }
};

export const addLeaseToFirestore = async (userId, leaseData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const leasesCollectionRef = collection(userDocRef, 'leases');
    
    const leaseWithTimestamp = {
      ...leaseData,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(leasesCollectionRef, leaseWithTimestamp);
    return { success: true, leaseId: docRef.id };
  } catch (error) {
    console.error('Error adding lease:', error);
    return { success: false, error: error.message };
  }
};