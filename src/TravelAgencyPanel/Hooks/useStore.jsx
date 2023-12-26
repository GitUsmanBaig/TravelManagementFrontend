import create from "zustand";

export const useStore = create(set => ({
  AgencyToken: null,
  setAgencyToken: AgencyToken => set({ AgencyToken }),
  AgencyId: null,
  setAgencyId: AgencyId => set({ AgencyId }),
}));
