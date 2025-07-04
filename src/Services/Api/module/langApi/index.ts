import api from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    postText: build.mutation({
      query: (payload: { text: string; outputFormat: string }) => ({
        url: `/external-api/free-google-translator?from=en&to=hi&query=${payload.text}`,
        method: 'POST',
        body: {
          translate: 'rapidapi',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

// We can use the Lazy Query as well for GET requests depends on our Requirements.
// For POST request we will use mutations.
export const { usePostTextMutation } = userApi;
