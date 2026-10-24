import { PracticeChallenge } from '../types';

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: 'ch-two-sum',
    title: 'Two Sum with Optimal Hash Lookup',
    topic: 'Arrays & Hash Maps',
    difficulty: 'Easy',
    companyTags: ['google', 'microsoft', 'amazon', 'apple', 'tcs', 'infosys'],
    roleTags: ['Software Engineer', 'Full-Stack Developer', 'AI/ML Engineer'],
    problemStatement:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    inputFormat: 'nums = [2, 7, 11, 15], target = 9',
    outputFormat: '[0, 1]',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      Python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
      Java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      'C++': `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return { seen[complement], i };
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      JavaScript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
      Go: `func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, ok := seen[complement]; ok {
            return []int{idx, i}
        }
        seen[num] = i
    }
    return nil
}`,
    },
    solutionCode: {
      Python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      Java: `// O(N) time and O(N) space using HashMap`,
      'C++': `// O(N) time and O(N) space using unordered_map`,
      JavaScript: `// O(N) time and O(N) space using Map`,
      Go: `// O(N) time and O(N) space using map`,
    },
    testCases: [
      { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
      { input: '[3, 3], 6', expectedOutput: '[0, 1]' },
    ],
    hints: [
      'A brute force solution compares every pair using nested loops in O(N^2) time. Can we do it in a single pass?',
      'As you iterate through the list, keep track of numbers you have already seen and their indices in a hash map.',
      'Check if (target - current_number) already exists in your hash map.',
    ],
    timeComplexity: 'O(N) where N is the length of nums.',
    spaceComplexity: 'O(N) to store elements in the hash map.',
    explanation:
      'By utilizing a hash map, we achieve instantaneous O(1) average lookup time for the required complement value, reducing the quadratic O(N^2) search down to a single linear O(N) sweep.',
  },
  {
    id: 'ch-course-schedule',
    title: 'Course Schedule (Cycle Detection in Directed Graph)',
    topic: 'Graph Algorithms',
    difficulty: 'Medium',
    companyTags: ['google', 'amazon', 'microsoft', 'apple'],
    roleTags: ['Software Engineer', 'AI/ML Engineer'],
    problemStatement:
      'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`. Return `true` if you can finish all courses. Otherwise, return `false`.',
    inputFormat: 'numCourses = 2, prerequisites = [[1, 0]]',
    outputFormat: 'true',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1, 0]]',
        output: 'true',
        explanation: 'There are 2 courses to take. To take course 1 you should have finished course 0. So it is possible.',
      },
      {
        input: 'numCourses = 2, prerequisites = [[1, 0], [0, 1]]',
        output: 'false',
        explanation: 'To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. Circular deadlock!',
      },
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= a, b < numCourses',
    ],
    starterCode: {
      Python: `from collections import deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    # Build graph and in-degree array
    adj = {i: [] for i in range(numCourses)}
    in_degree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1
        
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    visited_count = 0
    
    while queue:
        curr = queue.popleft()
        visited_count += 1
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return visited_count == numCourses
`,
      Java: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);
        int visited = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            visited++;
            for (int neighbor : adj.get(curr)) {
                if (--inDegree[neighbor] == 0) q.offer(neighbor);
            }
        }
        return visited == numCourses;
    }
}`,
      'C++': `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) if (inDegree[i] == 0) q.push(i);
        int visited = 0;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            visited++;
            for (int neighbor : adj[curr]) {
                if (--inDegree[neighbor] == 0) q.push(neighbor);
            }
        }
        return visited == numCourses;
    }
};`,
      JavaScript: `function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    for (const [dest, src] of prerequisites) {
        adj[src].push(dest);
        inDegree[dest]++;
    }
    const q = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) q.push(i);
    }
    let visited = 0;
    while (q.length > 0) {
        const curr = q.shift();
        visited++;
        for (const neighbor of adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) q.push(neighbor);
        }
    }
    return visited === numCourses;
}`,
      Go: `func canFinish(numCourses int, prerequisites [][]int) bool {
    // Kahn's algorithm for topological sorting
    return true
}`,
    },
    solutionCode: {
      Python: `// BFS Kahn's Algorithm implementation`,
      Java: `// Standard Topological Sort via Kahn's BFS`,
      'C++': `// In-degree array queue based topological sort`,
      JavaScript: `// Queue BFS in-degree topological sort`,
      Go: `// Topological sort`,
    },
    testCases: [
      { input: '2, [[1, 0]]', expectedOutput: 'true' },
      { input: '2, [[1, 0], [0, 1]]', expectedOutput: 'false' },
    ],
    hints: [
      'This problem is equivalent to detecting if a directed cycle exists in a graph.',
      'Use Kahn’s algorithm (BFS with in-degree tracking) or 3-color DFS cycle detection.',
      'If the number of topologically processed nodes equals numCourses, no cycle exists.',
    ],
    timeComplexity: 'O(V + E) where V is numCourses and E is prerequisites count.',
    spaceComplexity: 'O(V + E) to store adjacency lists and queue.',
    explanation:
      'We construct a directed dependency graph. Using Kahn’s algorithm, any node with 0 in-degree has all prerequisites satisfied. If all nodes can be processed without reaching a deadlock, the curriculum can be completed.',
  },
  {
    id: 'ch-lru-cache',
    title: 'Design LRU (Least Recently Used) Cache',
    topic: 'System Design / Data Structures',
    difficulty: 'Medium',
    companyTags: ['amazon', 'google', 'microsoft', 'apple'],
    roleTags: ['Software Engineer', 'Full-Stack Developer'],
    problemStatement:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with `get(key)` and `put(key, value)` both running in average `O(1)` time complexity.',
    inputFormat: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
    outputFormat: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
    examples: [
      {
        input: 'LRUCache(2), put(1, 1), put(2, 2), get(1), put(3, 3), get(2)',
        output: 'get(1) -> 1, get(2) -> -1 (evicted!)',
        explanation: 'When key 3 is inserted, key 2 is evicted because key 1 was accessed recently.',
      },
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.',
    ],
    starterCode: {
      Python: `class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        # Sentinel dummy head and tail
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        prev = node.prev
        nxt = node.next
        prev.next = nxt
        nxt.prev = prev

    def _add(self, node):
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev.next = node
        self.tail.prev = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]
`,
      Java: `// Doubly Linked List + HashMap for O(1) operations`,
      'C++': `// std::list + std::unordered_map implementation`,
      JavaScript: `// Map preserves insertion order in JS, or use Doubly Linked List`,
      Go: `// Container/list + map implementation`,
    },
    solutionCode: {
      Python: `// Full Doubly Linked List + Hash Map solution`,
      Java: `// Solution`,
      'C++': `// Solution`,
      JavaScript: `// Solution`,
      Go: `// Solution`,
    },
    testCases: [
      { input: 'capacity=2, put(1,1), put(2,2), get(1)', expectedOutput: '1' },
      { input: 'put(3,3), get(2)', expectedOutput: '-1' },
    ],
    hints: [
      'To achieve O(1) time complexity for lookup and removal, combine a Hash Map with a Doubly Linked List.',
      'The Hash Map maps keys directly to Doubly Linked List nodes for O(1) node access.',
      'The Doubly Linked List allows O(1) node deletion and insertion at the tail (most recent) or eviction at head (least recent).',
    ],
    timeComplexity: 'O(1) for both get and put operations.',
    spaceComplexity: 'O(capacity) to store elements.',
    explanation:
      'The classic combination of a Doubly Linked List with dummy head/tail sentinels and a Hash Table provides the optimal architecture for cache evictions in constant time.',
  },
  {
    id: 'ch-kadanes-algorithm',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    topic: 'Dynamic Programming / Arrays',
    difficulty: 'Easy',
    companyTags: ['tcs', 'infosys', 'wipro', 'amazon', 'microsoft'],
    roleTags: ['Software Engineer', 'Full-Stack Developer', 'Data Analyst'],
    problemStatement:
      'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    inputFormat: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    outputFormat: '6',
    examples: [
      {
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        output: '6',
        explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
      },
      {
        input: 'nums = [5, 4, -1, 7, 8]',
        output: '23',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCode: {
      Python: `def maxSubArray(nums: list[int]) -> int:
    max_sum = nums[0]
    current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum
`,
      Java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};`,
      JavaScript: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`,
      Go: `func maxSubArray(nums []int) int {
    maxSum := nums[0]
    currSum := nums[0]
    for i := 1; i < len(nums); i++ {
        if nums[i] > currSum + nums[i] {
            currSum = nums[i]
        } else {
            currSum += nums[i]
        }
        if currSum > maxSum {
            maxSum = currSum
        }
    }
    return maxSum
}`,
    },
    solutionCode: {
      Python: `// Kadane's algorithm`,
      Java: `// Kadane's algorithm`,
      'C++': `// Kadane's algorithm`,
      JavaScript: `// Kadane's algorithm`,
      Go: `// Kadane's algorithm`,
    },
    testCases: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6' },
      { input: '[5, 4, -1, 7, 8]', expectedOutput: '23' },
    ],
    hints: [
      'If the running sum falls below zero, does it help to continue extending the previous subarray?',
      'At each index i, we either start a fresh subarray at nums[i] or extend the previous subarray: current_sum = max(nums[i], current_sum + nums[i]).',
    ],
    timeComplexity: 'O(N) linear time single pass.',
    spaceComplexity: 'O(1) constant extra space.',
    explanation:
      'Kadane’s algorithm computes the maximum subarray ending at each position in O(1) auxiliary space, resetting the window whenever the prefix sum turns negative.',
  },
];
