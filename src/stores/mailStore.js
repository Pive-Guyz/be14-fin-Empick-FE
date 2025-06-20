import { defineStore } from 'pinia';
import {
  createMailService,
  sendMailService,
  sendJobtestMailService,
  sendInterviewMailService,
  findAllMailsService,
  findMailByIdService,
  findMailsByEmailService,
} from '@/services/mailService';

export const useMailStore = defineStore('mail', {
  state: () => ({
    mails: [],
    currentMail: null,
    loading: false,
    error: null,
  }),

  actions: {
    async createMail(dto) {
      this.loading = true;
      try {
        const result = await createMailService(dto);
        return result;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async sendMail(dto) {
      this.loading = true;
      try {
        const result = await sendMailService(dto);
        return result;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async sendJobtestMail(id) {
      this.loading = true;
      try {
        const result = await sendJobtestMailService(id);
        return result;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async sendInterviewMail(id) {
      this.loading = true;
      try {
        const result = await sendInterviewMailService(id);
        return result;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async fetchAllMails() {
      this.loading = true;
      try {
        this.mails = await findAllMailsService();
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchMailById(id) {
      this.loading = true;
      try {
        this.currentMail = await findMailByIdService(id);
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchMailsByEmail(email) {
      this.loading = true;
      try {
        this.mails = await findMailsByEmailService(email);
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
