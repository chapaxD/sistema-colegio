import { defineStore } from 'pinia';
import api from '../api';

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchStudents(showInactive = false) {
      this.loading = true;
      try {
        const response = await api.get(`/students?showInactive=${showInactive}`);
        this.students = response.data;
      } catch (err) {
        this.error = 'Error al cargar estudiantes';
      } finally {
        this.loading = false;
      }
    },

    async addStudent(student) {
      try {
        const response = await api.post('/students', student);
        this.students.push(response.data);
        return true;
      } catch (err) {
        this.error = 'Error al registrar estudiante';
        return false;
      }
    },

    async deleteStudent(id) {
      try {
        await api.delete(`/students/${id}`);
        this.students = this.students.filter(s => s.id !== id);
      } catch (err) {
        this.error = 'Error al eliminar estudiante';
      }
    },

    async updateStudent(id, student) {
      try {
        const response = await api.patch(`/students/${id}`, student);
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
          this.students[index] = response.data;
        }
        return true;
      } catch (err) {
        this.error = 'Error al actualizar estudiante';
        return false;
      }
    }
  }
});
