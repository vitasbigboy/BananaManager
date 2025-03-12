import { bananaManager } from "../src/bananaManager";

describe("Banana Manager", () => {
  let manager;

  beforeEach(() => {
    manager = bananaManager();
  });

  test("Добавление банана", () => {
    manager.addBanana(8);
    const bananas = manager.getBananas();
    expect(bananas.length).toBe(1);
    expect(bananas[0].freshness).toBe(8);
  });

  test("Удаление банана", () => {
    manager.addBanana(5);
    const [banana] = manager.getBananas();
    manager.removeBanana(banana.id);
    expect(manager.getBananas().length).toBe(0);
  });

  test("Распределение бананов", () => {
    manager.addBanana(7);
    manager.addBanana(9);
    const users = ["Alice", "Bob"];
    const distributed = manager.distributeBananas(users);
    expect(distributed.length).toBe(2);
    expect(distributed[0].user).toBe("Alice");
    expect(distributed[1].user).toBe("Bob");
  });

  test("Сортировка бананов по свежести", () => {
    manager.addBanana(5);
    manager.addBanana(9);
    manager.addBanana(3);
    manager.sortBananasByFreshness();
    const bananas = manager.getBananas();
    expect(bananas[0].freshness).toBe(9);
    expect(bananas[1].freshness).toBe(5);
    expect(bananas[2].freshness).toBe(3);
  });

  test("Удаление испорченных бананов", () => {
    manager.addBanana(0);
    manager.addBanana(4);
    const removed = manager.removeSpoiledBananas();
    expect(removed.length).toBe(1);
    expect(manager.getBananas().length).toBe(1);
  });

  test("Получение статистики по бананам", () => {
    manager.addBanana(6);
    manager.addBanana(4);
    const stats = manager.getBananaStatistics();
    expect(stats.total).toBe(2);
    expect(stats.averageFreshness).toBe(5);
  });

  test("Логирование действий", () => {
    manager.addBanana(8);
    manager.removeSpoiledBananas();
    const log = manager.getActionsLog();
    expect(log.length).toBe(2);
    expect(log[0].type).toBe("ADD");
    expect(log[1].type).toBe("REMOVE_SPOILED");
  });
});
