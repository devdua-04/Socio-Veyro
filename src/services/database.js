import Dexie from 'dexie';

export class ContentDatabase extends Dexie {
  constructor() {
    super('ContentCalendarDB');
    
    this.version(1).stores({
      ideas: '++id, title, description, scheduledDate, platform, contentType, status, createdAt',
      settings: '++id, key, value'
    });
  }
}

export const db = new ContentDatabase();

// Helper functions for database operations
export const addIdea = async (idea) => {
  try {
    const id = await db.ideas.add({
      ...idea,
      createdAt: new Date(),
      status: 'scheduled'
    });
    return id;
  } catch (error) {
    console.error('Error adding idea:', error);
    throw error;
  }
};

export const getAllIdeas = async () => {
  try {
    return await db.ideas.orderBy('scheduledDate').toArray();
  } catch (error) {
    console.error('Error getting ideas:', error);
    return [];
  }
};

export const updateIdea = async (id, updates) => {
  try {
    return await db.ideas.update(id, updates);
  } catch (error) {
    console.error('Error updating idea:', error);
    throw error;
  }
};

export const deleteIdea = async (id) => {
  try {
    return await db.ideas.delete(id);
  } catch (error) {
    console.error('Error deleting idea:', error);
    throw error;
  }
};

export const getIdeasForDate = async (date) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return await db.ideas
      .where('scheduledDate')
      .between(startOfDay, endOfDay)
      .toArray();
  } catch (error) {
    console.error('Error getting ideas for date:', error);
    return [];
  }
};

export const saveUserEmail = async (email) => {
  try {
    await db.settings.put({ key: 'userEmail', value: email });
  } catch (error) {
    console.error('Error saving email:', error);
    throw error;
  }
};

export const getUserEmail = async () => {
  try {
    const setting = await db.settings.where('key').equals('userEmail').first();
    return setting ? setting.value : null;
  } catch (error) {
    console.error('Error getting email:', error);
    return null;
  }
};