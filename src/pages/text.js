 else if (user?.displayName) {
        const data = await db
          .collection("posts")
          .where("email", "==", user?.email)
          .get();
        const response = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          data: doc.data(),
        }));
        setPostLength(response);

        const results = response.map((data) => {
          setProfile(data);
        });
        return results;
      }