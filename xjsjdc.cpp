#include <bits/stdc++.h>
using namespace std;
 
// Function to perform DFS and find the
// distance from a node to every other
// node
void dfs(int s, vector<vector<int> > g,
         int p, int d, int& ans)
{
    for (int i : g[s]) {
 
        // If i is not equal to
        // parent p
        if (i != p) {
            ans += d;
            dfs(i, g, s, d + 1, ans);
        }
    }
}
 
// Function to find the maximum sum of
// distance from a node to every other
// node
void maxPotentialDistance(
    int N, vector<vector<int> >& edges)
{
    int ans = 0;
 
    // Construct the graph
    vector<vector<int> > g(N, vector<int>());
 
    for (auto& it : edges) {
        g[it[0]].push_back(it[1]);
        g[it[1]].push_back(it[0]);
    }
 
    // Find the sum of distances from
    // every node
    for (int i = 0; i < N; i++) {
 
        // Stores the maximum sum of
        // distance considering the
        // current node as source node
        int a = 0;
 
        // Perform DFS Traversal to
        // find the sum of distances
        dfs(i, g, -1, 1, a);
 
        // Update the maximum sum
        ans = max(ans, a);
    }
 
    // Print the maximum sum
    cout << ans;
}
 int main()
{
	int n;
	cin>>n;
	vector<vector<int>> edges;
	for(int i=0;i<n;i++){
	    int u,v;
	    cin>>u>>v;
	    edges[u].push_back(v);
	    edges[v].push_back(u);
	}
}

	
	maxPotentialDistance(n, edges);
}
