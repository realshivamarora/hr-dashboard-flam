import { create } from 'zustand';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
};

type BookmarkStore = {
  bookmarks: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
};

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],

  addBookmark: (user) => {
    if (!get().isBookmarked(user.id)) {
      set((state) => ({
        bookmarks: [...state.bookmarks, user],
      }));
    }
  },

  removeBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((u) => u.id !== id),
    }));
  },

  isBookmarked: (id) => {
    return get().bookmarks.some((u) => u.id === id);
  },
}));
