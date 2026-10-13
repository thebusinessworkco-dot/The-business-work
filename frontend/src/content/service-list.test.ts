import { describe, it, expect } from "vitest";
import { services } from "./services";
import { serviceList } from "./service-list";

describe("serviceList synchronization", () => {
  it("has exactly the same number of services as services.ts", () => {
    expect(serviceList).toHaveLength(services.length);
  });

  it("matches id, slug, and title for every service in services.ts", () => {
    services.forEach((s, idx) => {
      const item = serviceList[idx];
      expect(item).toBeDefined();
      expect(item.id).toBe(s.id);
      expect(item.slug).toBe(s.id);
      expect(item.title).toBe(s.title);
    });
  });

  it("contains only id, slug, and title properties to keep bundle small", () => {
    serviceList.forEach((item) => {
      const keys = Object.keys(item).sort();
      expect(keys).toEqual(["id", "slug", "title"]);
    });
  });
});
